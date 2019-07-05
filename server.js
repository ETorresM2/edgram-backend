const express = require("express");
const port = process.env.PORT || 5000;

const server = express();

server.get("/", (req, res) => {
  res.send("Hi Amanda, this is sent from Edwins epic server");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
