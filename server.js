const knex = require("knex");
const express = require("express");
const port = process.env.PORT || 5000;

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/edgram.db"
  },
  useNullAsDefault: true
};

const server = express();
server.use(express.json());
const db = knex(knexConfig);

server.get("/", (req, res) => {
  res.send("Hi Amanda, this is sent from Edwins epic server");
});

server.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/users", (req, res) => {
  db("users")
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
