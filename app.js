const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('app.properties');

const app = express();

//catest@1234

var con = mysql.createConnection({
 host: properties.get('db.host'),
 user: properties.get('db.user'),
 password: properties.get('db.password'),
});


con.connect(function(err) {
  if (err) throw err;
  con.query("use covid_assessment_db", function(err, result) {
  });
  console.log("Connected!");
});



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

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.post("/success", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var birthdayDate = req.body.birthdayDate;
  var Gender = req.body.inlineRadioOptions;
  var Address = req.body.Address;
  var emailAddress = req.body.emailAddress;
  var password = req.body.password;
  bcrypt.hash(password,10, function(err, hash) {
    var sql = "INSERT INTO users(first_name, last_name, dob, gender, address, email, password) VALUES ?";

    var values = [[firstName,lastName,birthdayDate,Gender,Address,emailAddress,hash]]

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
    });
    res.render("success");
});
});

app.post("/login", function(req, res) {
  var email = req.body.email;
  var pwd = req.body.pwd;
  var queryString = "SELECT * from users where email=?";
  con.query(queryString, [email], function(err, result){
    if (err) throw err;
    bcrypt.compare(pwd, result[0].password, function(err, isMatched) {
        // result == true
        if(isMatched) {
          res.render("success.ejs");
        } else {
          res.render("login.ejs");
        }
    });
  });
});
