const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");

//config

//json config

app.set('json spaces', 4)

//CORS
app.use(cors())

// JWT


//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Leitura de solicitações json
app.use(express.json());

// Rotas
app.use(routes);

// Porta do Servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});