const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

module.exports = {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ["id", "name", "email"],
      order: [["id", "DESC"]],
    });

    console.log(user);

    return user;
  },

  async store(req, res) {
    let dados = req.body;
    console.log(dados);
    dados.senha = await bcrypt.hash(dados.senha, 8);

    await User.create(dados)
      .then(() => {
        return res.json({
          erro: false,
          mensagem: "Usuário cadastrado com sucesso!",
        });
      })
      .catch(() => {
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Usuário não cadastrado com sucesso!",
        });
      });
  },

  async login(req, res) {
    console.log(req.body);
    const user = await User.findOne({
      attributes: ["id", "name", "email", "senha"],
      where: {
        email: req.body.email,
      },
    });

    if (user === null) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuário ou senha incorreto",
      });
    }

    if (!bcrypt.compare(req.body.senha, user.senha)) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!",
      });
    }

    let token = jwt.sign({ id: user.id }, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {
      expiresIn: 600, //10 min
      // expiresIn: 60, //1 min
      // expiresIn: "7d", // 7 dia
    });
    return res.json({
      erro: false,
      mensagem: "Login realizado com sucesso",
      token,
    });
  },
};
