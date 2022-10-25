const User = require("../models/User");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const swal = require('sweetalert2')

module.exports = {
  async index(req, res) {
    if	(req.session.idUser)	{
      res.render('home',{
      session:	req.session,
      id:	req.session.idUser
          });
      }else{
        res.redirect('/login')
      };


  },

  async list(req, res){
    if	(req.session.idUser){
    const user = await User.findAll({
      attributes: ["id", "name", "email"],
      order: [["id", "DESC"]],
    })

    return res.json({
      erro: false,
      user,
      id_user: req.session.idUser,
      })
    }else{
      res.redirect('/login')
    }
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
          return res.json({
            error: false,
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
    
    if (user === null) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuário ou senha incorreto",
      });
    }else if (!bcrypt.compare(req.body.senha, user.senha)) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!",
      });
    }else{
      console.log('logou');
      req.session.idUser	=	user.id;
      res.redirect('/');
    }

  },
  
  async logout(req,res,next){
    console.log('Logout')
    req.session.destroy();
    res.redirect('/login');
  }
};
