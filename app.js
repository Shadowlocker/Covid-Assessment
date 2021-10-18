const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require('mysql');

const app = express();

//catest@1234
/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "catest@1234"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // con.query("create database qw", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});

*/
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen("3000", function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});
