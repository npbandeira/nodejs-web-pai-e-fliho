const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Session = require("express-session");
const swal = require('sweetalert2')

module.exports = {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ["id", "name", "email"],
      order: [["id", "DESC"]],
    })
    return user;
  },

  async store(req, res) {

    let dados = req.body

    console.log(dados)

    dados.senha = await bcrypt.hash(dados.senha, 8);

    const user = await User.findOne({
      attributes: ["name", "email",],
      where: {
        email: dados.email,
      },
    });

    if (user === null) {
      await User.create(dados)
        .then(() => {
          return  res.json({
            error:false,
          mensagem: "Cadastrado com sucesso"
          })
        })
        .catch(() => {
          return console.error("nao cadastrado");
        });
    } else {
      return res.status(402).json({
        erro: true,
        mensagem: "Email já cadastrado"
      })
    }
  },

async login(req, res) {

  const user = await User.findOne({
    attributes: ["id", "name", "email", "senha"],
    where: {
      email: req.body.email,
    },
  })

  console.log(user);
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

  }
};
