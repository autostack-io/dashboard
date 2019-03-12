const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/api/auth", (req, res, next) => {
  axios.post("http://localhost:8000/oauth/token", {
    grant_type: "password",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: req.body.user,
    password: req.body.pass,
    scope: "*",
  }).then((data) => {
    res.send(data.data);
  }, (err) => {
    if (err.response) {
      res.status(err.response.status).send(err.response.data);
    } else {
      next(err);
    }
  });
});

app.post("/api/auth/renew", (req, res, next) => {
  axios.post("http://localhost:8000/oauth/token", {
    grant_type: "refresh_token",
    refresh_token: req.body.refresh_token,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: "*",
  }).then((data) => {
    res.send(data.data);
  }, (err) => {
    if (err.response) {
      res.status(err.response.status).send(err.response.data);
    } else {
      next(err);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
