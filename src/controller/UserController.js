const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, email, senha } = req.body;

    const user = await User.create({ name, email, senha });

    return res.json(user);
  },

  async logar(req, res) {
    const dados = req.body;
    console.log(dados);
    const user = await User.findOne({
      attributes: ["id", "name", "email", "senha"],
      where: {
        email: dados.email,
      },
    });

    if (user === null) {
      return res.status(400).json({
        erro: true,
        mensagem:
          "Erro: Usuário ou a senha incorreta! Nenhum usuário com este e-mail",
      });
    }
  },
};
