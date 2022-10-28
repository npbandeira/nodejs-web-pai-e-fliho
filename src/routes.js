const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const UserController = require("./controller/UserController");
const User = require("./models/User");

const routes = express.Router();

// Login
routes.get("/login", (req, res) => {
  res.render("login.html");
});

// Cadastro
routes.get("/cadastro", (req, res) => {
  res.render("cadastrar.html");
});

// Rotas de Usuario
routes.get("/", UserController.index);

routes.get("/logout", UserController.logout);

// Cadastro de Usuario
routes.post("/cadastrar", UserController.store);

// Login
routes.post("/logar", UserController.login);

// Listar Usuarios
routes.get("/listar", UserController.list);

// Criar Lição

routes.get('/licao/criar', (req, res) =>{
  res.render('criar_licao.html')
})



module.exports = routes;
