const express = require("express");
const port = process.env.PORT || 5000;

const server = express();

server.get("/", (requ, res) => {
  res.send("hello world");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
