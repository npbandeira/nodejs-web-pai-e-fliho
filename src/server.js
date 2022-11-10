const express = require("express");
const routes = require("./routes");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");

//config

//json config

app.set('json spaces', 4)

//CORS
const option ={
    origin: "http://localhost:3333"
}

// Session 
app.use(session({
    secret:"picurso",
    resave: false,
    saveUninitialized: false,
}));

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