const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


const User = require("./models/User");
const Perfil = require('./models/Perfil');

const PerfilController = require('./controller/PerfilController')
const UserController = require("./controller/UserController");

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
routes.get("/", (req, res, next)=>{
  res.render('home.html')
});

routes.get("/logout", UserController.logout);

// Cadastro de Usuario
routes.post("/cadastrar", UserController.store);

// Login
routes.post("/logar", UserController.login);

// Listar Usuarios
routes.get("/listar", UserController.list);

// Perfil
routes.get('/user/perfil', (req,res)=>{
  res.render('Perfil.html');
})

routes.get('/user/:user_id/perfil', PerfilController.index);
routes.post('/user/:user_id/perfil/create', PerfilController.store);

// Criar Lição

routes.get('/criar_licao', (req, res) =>{
  res.render('criar_licao.html')
})
// post de criação
// routes.post('/criar_licao/criar', PerfilController.store)

module.exports = routes;
