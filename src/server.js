const express = require("express");
const routes = require("./routes");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const session = require("express-session");


//config
//json config
app.set('json spaces', 4)
//conexexao com o banco de dados
require("./database");

//CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Session 
app.use(session({
    secret:"picurso",
    resave: false,
    saveUninitialized: false,
}));

//css e assets
app.use(express.static(path.join(__dirname + "/assets")));

//HTML
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Leitura de solicitações json
app.use(express.json());

// Rotas
app.use(routes);

// Porta do Servidor
app.listen(3333);