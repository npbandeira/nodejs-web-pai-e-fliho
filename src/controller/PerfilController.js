
// const session = require("express-session");
// const { json } = require("body-parser");
// const { update } = require("../models/Perfil");

// module.exports = {

//   // listagem de perfil do usuario
//   async index(req, res, next) {
//     const { user_id } = req.params;
//     const user = await User.findByPk(user_id);

//     if (!user) {
//       return res.status(400).json({
//         mensagem: "Usuario não encontrado",
//       });
//     }
//     try {
//       const perfil = await Perfil.findAll({
//         where: {
//           user_id: user_id,
//         },
//       });
//       if (perfil <= 0) {
//         return res.json({
//           mensagem: "Adcione Um perfil",
//         });
//       }
//       return res.json(perfil);
//     } catch (error) {
//       res.json(error);
//     }
//   },

//   async store(req, res, next) {
//     const { user_id } = req.params;
//     const { nome, tipo } = req.body;

//     const user = await User.findByPk(user_id);

//     if (!user) {
//       return res.status(400).json({
//         mensagem: "Usuario não encontrado",
//       });
//     }
//     const perfil = await Perfil.create({ nome, tipo, user_id });

//     return res.json(perfil);
//   },

//   async update(req, res, next) {
//     const { user_id } = req.params;
//     const { id, nome } = req.body;

//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(400).json({
//         mensagem: "Usuario não encontrado",
//       });
//     }
//     // if (perfil <= 0) {
//     //   return res.json({
//     //     mensagem: "Adcione Um perfil",
//     //   });
//     // }

//     const perfil = await Perfil.update(
      
//       {
//         id,
//         nome,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
    
//     return res.json(perfil);
//   },

//   async delete(req, res, next) {
//     const { user_id } = req.params;
//     const { id } = req.body;

//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(400).json({
//         mensagem: "Usuario não encontrado",
//       });
//     }
//     const perfil = await Perfil.destroy({
//       where: {
//         id: id,
//       },
//     });

//     return res.json(perfil);
//   },
// };
