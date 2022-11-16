const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PerfilController = require('./controller/PerfilController')
const UserController = require("./controller/UserController");

const routes = express.Router();

// // Login
routes.post("/login",UserController.login);

// // Cadastro

routes.post("/cadastrar", UserController.store);

// // Rotas de Usuario

// routes.get("/logout", UserController.logout);

// Listar Usuarios
routes.get("/listar", UserController.list);

// Perfil
routes.get('/user/:id', PerfilController.index);

routes.post('/user/:id', PerfilController.store);

routes.put('/perfil/:id', PerfilController.update)

routes.delete('/user/:id/perfil/:perfilid', PerfilController.delete);



module.exports = routes;
