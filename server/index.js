const express = require("express");
const app = express();
const config = require("./common/config");
const http = require("http");
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


http.createServer(app).listen(config.app.port, () =>
  console.log(`Hackathon military demo app is running locally at http://localhost:${config.app.port}.`)
);
