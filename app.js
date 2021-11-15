const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('app.properties');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const options = {
    host:  properties.get('db.host'),
    user: properties.get('db.user'),
    password: properties.get('db.password'),
    database: properties.get('db.name')
};

var con = mysql.createConnection(options);

const sessionStore = new MySQLStore({}, con);

app.use(
    session({
        secret: 'cookie_secret_code',
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })
);


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

app.get("/results", function(req, res) {
  res.render("results");
});
app.get("/results-faq", function(req, res) {
  res.render("results-faq");
});
app.get("/test-results", function(req, res) {
  var queryString = "SELECT * from final_results where email=?" ;
  con.query(queryString, [req.session.email], function(err, results){
    if (err) throw err;
    res.render("test-results", {testResults: results});
  });
});

app.get("/book_appointment", function(req, res) {
  res.render("book_appointment");
});

app.post("/booking_success", function(req, res) {
  var appointment = {

  }
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var datetime_of_appointment = req.body.datetime_of_appointment;
  var status;
  

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  var reference= randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  

    var sql = "INSERT INTO appointments(first_name, last_name, email, datetime_of_appointment, status,reference) VALUES (?,?,?,?,?,?)";
    con.query("use covid_assessment_db", function(err, result) {

    });
    con.query(sql, [firstname, lastname, email, datetime_of_appointment, 'B', reference], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted"+result.insertedId);
      console.log(datetime_of_appointment);
    });
    res.render("booking_success", {reference: reference});
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

app.get("/view_appointments", function(req, res) {
  var queryString = "SELECT * from appointments where email=?";
  con.query(queryString, [req.session.email], function(err, results){
    if (err) throw err;
    res.render("view_appointments", {appointments: results});
  });
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
  var sess = req.session;
  sess.email = req.body.email;
  var email = req.body.email;
  var pwd = req.body.pwd;
  var queryString = "SELECT * from users where email=?";
  con.query(queryString, [email], function(err, result){
    if (err) throw err;
    bcrypt.compare(pwd, result[0].password, function(err, isMatched) {
        // result == true
        if(isMatched) {
          res.render("user_home");
        } else {
          res.render("login.ejs");
        }
    });
  });
});
