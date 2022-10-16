const express = require("express");
const path = require("path");

const UserController = require("./controller/UserController");

const routes = express.Router();

routes.get("/", (res, req) => {
  res.render("create-user.html");
});

module.exports = routes;
