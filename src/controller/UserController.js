const { PrismaClient } = require("@prisma/client");
const { transformDocument } = require("@prisma/client/runtime");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { z } = require("zod")

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

module.exports = {
  async list(request, response) {
    const userResponse = await prisma.user.findMany();

    return response.json(user);
  },

  async store(request, response) {

    const User = z.object({
      name: z.string(),
      email: z.string().email(),
      senha: z.string().min(8)
    })
    let Info = User.parse(request.body);

    Info.senha = await bcrypt.hash(Info.senha, 8);
    

    const userResponse= await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        email: Info.email,
      },
    });

    const userCreate = await prisma.user.create({data: Info});

    return response.json(Info);
  },

  // async store(req, res) {
  //   let dados = req.body;

  //   console.log(dados);

  //   dados.senha = await bcrypt.hash(dados.senha, 8);

  //   const user = await User.findOne({
  //     attributes: ["name", "email"],
  //     where: {
  //       email: dados.email,
  //     },
  //   });
};
