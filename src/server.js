const express = require("express");
const routes = require("./routes");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
//config
//template engine
app.use(express.static(path.join(__dirname + "/assets")));

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexexao com o banco de dados
require("./database");

app.use(express.json());
// app.use(routes);

app.listen(3333);
