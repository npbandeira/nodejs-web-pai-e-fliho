const { PrismaClient } = require("@prisma/client");
const { z, string, number } = require("zod");


const prisma = new PrismaClient({
  log: ["query", "warn", "error"],
});
module.exports ={
  async list(request, response) {

  }
}