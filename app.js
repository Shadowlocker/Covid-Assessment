const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require('mysql');

const app = express();

//catest@1234

var con = mysql.createConnection({
  host: "covid-assessment-db-instance.cjotobxooc2g.us-west-1.rds.amazonaws.com",
  user: "assessmentadmin",
  password: "assessmentpassword"
});

con.connect(function(err) {
  if (err) throw err;
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
  var user = {

  }
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var birthdayDate = req.body.birthdayDate;
  var Gender = req.body.inlineRadioOptions;
  var Address = req.body.Address;
  var emailAddress = req.body.emailAddress;
  var password = req.body.password;

    var sql = "INSERT INTO users(first_name, last_name, dob, gender, address, email, password) VALUES (?,?,?, ?, ?, ?, ?)";
    con.query("use covid_assessment_db", function(err, result) {

    });
    con.query(sql, [firstName, lastName, birthdayDate, Gender, Address, emailAddress, password], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted"+result.insertedId);
    });
    res.render("success");
});
