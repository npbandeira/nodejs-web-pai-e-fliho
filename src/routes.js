const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const UserController = require("./controller/UserController");
const e = require("express");

const routes = express.Router();

routes.get("/login", (req, res) => {
  res.render("login.html");
});

routes.get("/cadastro", (req, res) => {
  res.render("cadastrar.html");
});

routes.post("/cadastrar", UserController.store);
routes.get("/users", UserController.index);
routes.post("/logar", UserController.logar);

module.exports = routes;
