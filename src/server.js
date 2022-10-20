const express = require("express");
const routes = require("./routes");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require('connect-flash')


//config

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
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// Middleware 
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("Success_MSG");
    res.locals.error = req.flash("Error_MSG");
    next();
})
//css e assets
app.use(express.static(path.join(__dirname + "/assets")));
//HTML
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexexao com o banco de dados
require("./database");

// Leitura de solicitações json
app.use(express.json());
// Rotas
app.use(routes);
// Porta do Servidor
app.listen(3333);
