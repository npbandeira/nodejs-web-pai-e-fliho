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
  /*   let erros = []
    if (!req.body.name || typeof req.body.name === undefined || req.body.name === null) {
      erros.push({
        text: "Nome inválido"
      })
    }
    if (!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
      erros.push({
        text: "Senha inválida"
      })
    }
    if (req.body.senha.length < 5) {
      erros.push({
        text: "Senha muito pequena"
      })
    } */
      var dados = req.body
      console.log(dados)
      dados.senha = await bcrypt.hash(dados.senha, 8);
      await User.create(dados)
        .then(() => {
          res.json(dados)
          
        })
        .catch(() => {
          res.json({
            erro: true,
            mensage: "usuario nao cadastrado"
          });
        },
        )

    
  },

  async login(req, res) {

    const user = await User.findOne({

      attributes: ["id", "name", "email", "senha"],
      where: {
        email: req.body.email,
      },
    })
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


    return res.json({
      erro: false,
      mensagem: "Login realizado com sucesso",
    });

  }
};
