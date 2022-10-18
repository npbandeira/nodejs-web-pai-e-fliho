const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { isFather } = require("./middlewares/auth");

const UserController = require("./controller/UserController");
const e = require("express");
const User = require("./models/User");

const routes = express.Router();

routes.get("/login", (req, res) => {
  res.render("login.html");
});

routes.get("/cadastro", (req, res) => {
  res.render("cadastrar.html");
});
routes.get("/", isFather, async (req, res) => {
  await UserController.index()
    .then((user) => {
      return res.json({
        erro: false,
        user,
        id_usuario_logado: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nenhum usuário encontrado!",
      });
    });
});

routes.post("/cadastrar", UserController.store);
routes.get("/users", UserController.index);
routes.post("/logar", UserController.login);

module.exports = routes;
