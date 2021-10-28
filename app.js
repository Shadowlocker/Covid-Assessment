const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require('mysql');
var bcrypt = require('bcrypt');

const app = express();

//catest@1234

/*var con = mysql.createConnection({
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

 var con = mysql.createConnection({
   host: "localhost",
   user: "root",
  password: "suja28@TCS"
 });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   //  con.query("create database covid_assessment_db_instance", function (err, result) {
//   //   if (err) throw err;
//   //   console.log("Database created");
//   //  });
// });


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
  bcrypt.hash(password,10, function(err, hash) {
   // var sql = "INSERT INTO curd_table (first_name,last_name,username,password) VALUES ?";
    var sql = "INSERT INTO users(first_name, last_name, dob, gender, address, email, password) VALUES ?";
    //var sql = "INSERT INTO users(first_name, last_name, dob, gender, address, email, password) VALUES (?,?,?, ?, ?, ?, ?)";
    var values = [[firstName,lastName,birthdayDate,Gender,Address,emailAddress,hash]]
    
    con.query("use covid_assessment_db_instance", function(err, result) {

      con.query(sql,[values], function (err, result, fields) {
   // con.query(sql, [firstName, lastName, birthdayDate, Gender, Address, emailAddress, password], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted"+result.insertedId);
    });
    res.render("success");
});
  });
});
