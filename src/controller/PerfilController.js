const { PrismaClient } = require("@prisma/client");
const { z, string, number } = require("zod");

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
        userId: user.id,
      },
      include: {
        dono: {
          select: {
            name: true

          }
        }
      }

    });

    user.senha = undefined;

    return response.json(perfil);
  },

  async store(request, response) {
    const userRequestParams = z.object({
      id: string(),
    });
    const perfilRequestBody = z.object({
      name: string(),
      type: number().int().min(0).max(1),
    });
    const userId = userRequestParams.parse(request.params);
    const perfilBody = perfilRequestBody.parse(request.body);

    const user = await prisma.user.findUnique({
      where: userId,
    })

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

  async find(request, response) {

    // implementar token 

    const perfilRequestBody = z.object({
      name: string().optional(),
    });
    const perfilInfoBody = perfilRequestBody.parse(request.body);


    const perfil = await prisma.perfil.findMany({
      where: {
        nome: {
          contains: perfilInfoBody.name
        }
      }
    })

    return response.json(perfil)
  },

  async update(request, response) {

    const perfilRequestParams = z.object({

      perfilId: string(),
      userId: string().cuid(),
    });
    const perfilRequestBody = z.object({
      name: string(),
    });

    const perfilInfoParams = perfilRequestParams.parse(request.params)
    const perfilInfoBody = perfilRequestBody.parse(request.body);


    const perfil = await prisma.perfil.update({
      where: {
        id: parseInt(perfilInfoParams.perfilId),
      },

      data: {
        nome: perfilInfoBody.name
      }
    })

    return response.json(perfil)
  },

  async delete(request, response) {

    const perfilRequestParams = z.object({
      perfilId: string(),
      userId: string().cuid(),
    })

    const perfilInfoParams = perfilRequestParams.parse(request.params)

    const perfilFind = await prisma.perfil.findUnique({
      where: {
        id: parseInt(perfilInfoParams.perfilId)
      }
    })
    if (!perfilFind){
      return response.json({
        mensagem: "Perfil não encotrado (delete)"
      })
    }
    const perfil = await prisma.perfil.delete({
      where: {
        id: parseInt(perfilInfoParams.perfilId),
      },
    })
    return response.json(perfil)
  }
};
