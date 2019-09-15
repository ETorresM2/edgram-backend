const knex = require("knex");
const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const port = process.env.PORT || 5000;

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/edgram.db"
  },
  useNullAsDefault: true
};

const sessionConfig = {
  name: "gram",
  secret: "bigsecret",
  cookie: {
    maxAge: 1000 * 30,
    secure: process.env.SECURE || false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};

const server = express();
server.use(express.json());
server.use(session(sessionConfig));
const db = knex(knexConfig);

function protected(req, res, next) {
  console.log("req.session", req.session);
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Not Authenticated" });
  }
}

server.get("/", (req, res) => {
  res.send("Sanity Check");
});

server.get("/users", protected, (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/users/:id", (req, res) => {
  console.log(req.params);
  db("users")
    .where("id", req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/users", (req, res) => {
  let creds = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/posts", (req, res) => {
  db("posts")
    .then(posts => {
      res.status(500).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/posts", (req, res) => {
  db("posts")
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/posts/:senderId/:receiverId", (req, res) => {
  console.log(req.params);
  db("posts")
    .where({ sender: req.params.senderId, receiver: req.params.receiverId })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/login", (req, res) => {
  const creds = req.body;
  console.log(creds);
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        req.session.user = user;
        console.log("session: ", req.session)
        res.status(200).json({ message: "authenticated" });
      } else {
        res.status(401).json({ message: "failure" });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.use(function(req, res) {
  res.status(404).send("Error: 404 This page does not exist");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
