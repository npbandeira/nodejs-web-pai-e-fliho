const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { z, string, bigint, number } = require("zod");

const prisma = new PrismaClient({
  log: ["query", "warn", "error"],
});

module.exports = {

  /**
   * @api {post} /api/login Login
  **/

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
    console.log(request.params);
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
        userId: userId.id,
      },
    });

    return response.json(perfil);
  },

  async update(request, response) {
 
    const userRequestParams = z.object({
      id: string().cuid(),
    });
    const perfilRequestBody = z.object({
      name: string(),
      type: number().int().min(0).max(1),
    });

    const userInfo = userRequestParams.parse(request.params)

    const perfilInfo = perfilRequestBody.parse(request.body)

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.id,
      }
    })
    if(!user){
      return response.status(401).json({
        mensagem: "Usuario não encontrado",
      });
    }
    const perfil = await prisma.perfil.update({
      where:{
        id: request.params.id
      },
      data: {
        nome: perfilInfo.name,
        tipo: perfilInfo.tipo,
      }
    })

    if(!perfil){
      return response.status(101).json({
        mensagem: "Cadastre um perfil",
      });

    }
    
    return response.json(user)
    

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
  },
};
