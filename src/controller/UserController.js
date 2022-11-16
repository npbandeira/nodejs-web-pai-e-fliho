const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { z } = require("zod")
const jwt = require('jsonwebtoken')


const prisma = new PrismaClient({
  log: ["query", "warn", "error"],
});

module.exports = {

  async list(request, response) {
    const users = await prisma.user.findMany();

    return response.send(users);
  },

  async store(request, response) {
      const userRequest = z.object({
      name: z.string(),
      email: z.string().email(),
      senha: z.string().min(8)
    })

    let userInfo = userRequest.parse(request.body)

    userInfo.senha = await bcrypt.hash(userInfo.senha, 8);

    const user = await prisma.user.findFirst({
      where: {
        email: userInfo.email,
      },
    })

    if(!user){
    const userCreate =  await prisma.user.create({
        data:{
          name: userInfo.name,
          email: userInfo.email,
          senha: userInfo.senha
        }
      })
      userCreate.senha = undefined
      return response.status(200).json({ 
        mensagem: "Usuario Cadastrado com Sucesso"
      });
    }

    return response.status(401).json({
      mensagem: "Email já cadastrado"
    });
  },

  async login(request, response){

    const userRequest = z.object({
      email: z.string().email(),
      senha: z.string()
    })

    const userInfo = userRequest.parse(request.body);

    const userSchema = await prisma.user.findFirst({
      where: {
        email: userInfo.email
      }
    })
    if (!userSchema){
      return response.status(401).json({
        mensagem: "Usuário não encontrado"
      })
    }
    if (!await bcrypt.compare( userInfo.senha, userSchema.senha)){
      return response.status(401).json({
        mensagem: "Usuário ou senha incorreta"
      })
    }
    
    return response.status(201).json({
     id: userSchema.id
    })
  }
  }
