const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
  isFather: async function (req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log(authHeaders);
    if (!authHeader) {
      return res.status(400).json({
        erro: true,
        mensagem:
          "Erro: Necessário realizar o login para acessar a página! falta o Token",
      });
    }

    const [, token] = authHeader.split(" ");
    console.log(" Token: " + token);
    req.session.user['sadasdf'];
    if (!token) {
      return res.status(400).json({
        erro: true,
        mensagem:
          "Erro: Necessário realizar o login para acessar a página! falta o Token B",
      });
    }

    try {
      const decode = await promisify(jwt.verify)(
        token,
        "D62ST92Y7A6V7K5C6W9ZU6W8KS3"
      );
      req.userID = decode.id;
      return next();
    } catch (erro) {
      return res.status(400).json({
        erro: true,
        mensagem: "token Invalidado",
      });
    }
  },
};
