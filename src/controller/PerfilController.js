const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { z, string, bigint, number } = require("zod");

const prisma = new PrismaClient({
  log: ["query", "warn", "error"],
});

module.exports = {
  async index(request, response) {
    const userRequest = z.object({
      id: string().cuid(),
    });

    const userId = userRequest.parse(request.params);

    const user = await prisma.user.findUnique({
      where: userId,

    });

    if (!user) {
      return response.status(401).json({
        mensagem: "user not found",
      });
    }

    const perfil = await prisma.perfil.findMany({
      where: {
        userId: userId.id,
      },
      
    });

    user.senha = undefined;

    return response.json(user);
  },

  async store(request, response) {
    const userRequestParams = z.object({
      id: string().cuid(),
    });
    const perfilRequestBody = z.object({
      name: string(),
      type: number().int().min(0).max(1),
    });

    const userId = userRequestParams.parse(request.params);
    const perfilBody = perfilRequestBody.parse(request.body);

    const user = await prisma.user.findUnique({
      where: userId,
    });
    if (!user) {
      return response.status(401).json({
        mensagem: "User not found",
      });
    }


    const perfil = await prisma.perfil.create({
      data: {
        nome: perfilBody.name,
        tipo: perfilBody.type,
        userId: userId.id
      },
       
    });

    return response.json(perfil);
    //     const user = await User.findByPk(user_id);

    //     if (!user) {
    //       return res.status(400).json({
    //         mensagem: "Usuario não encontrado",
    //       });
    //     }
    //     const perfil = await Perfil.create({ nome, tipo, user_id });

    //     return res.json(perfil);
    //   },
  },
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
};
