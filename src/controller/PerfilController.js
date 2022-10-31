const Perfil = require("../models/Perfil");
const User = require("../models/User");
const session = require("express-session");

module.exports = {
  async index(req, res, next) {
    const { user_id } = req.params;

    try {
      const perfil = await Perfil.findAll({
        where: {
          user_id: user_id,
        },
      });

      return res.json(perfil);
    } catch (error) {
      res.json(error);
    }
  },

  async store(req, res, next) {
    const { user_id } = req.params;
    const { nome, tipo } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        mensagem: "Usuario não encontrado",
      });
    }
    const perfil = await Perfil.create({ nome, tipo, user_id });
    return res.json(perfil);
  },
};
