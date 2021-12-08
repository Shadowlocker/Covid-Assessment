const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('app.properties');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var moment = require("moment");
var format = require('date-format');


const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

const options = {
  host: properties.get('db.host'),
  user: properties.get('db.user'),
  password: properties.get('db.password'),
  database: properties.get('db.name')
};

var con = mysql.createConnection(options);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const sessionStore = new MySQLStore({}, con);


app.use(
    session({
        secret: 'cookie_secret_code',
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    }));

app.listen("3000", function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/privacy-policy", function(req, res) {
  res.render("privacy-policy");
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
  console.log("date------", req.body.datetime_of_appointment);
  let now = new Date();
  var dateString = moment(now).format('YYYY-MM-DD');
  console.log(dateString);
  var queryForSlots = "SELECT time_of_appointment from available_slots where date_of_appointment=?";
  con.query(queryForSlots, [dateString], function(err, slots) {
    if (err) throw err;
    //res.render("view_appointments", {appointments: results});
    console.log("slots----", slots);
    res.render("book", {slots: slots});
  });

  //res.render("book_appointment");
});

app.post("/book_appointment", function(req, res) {
  console.log("date------", req.body.date_of_appointment);
  let now = new Date(req.body.date_of_appointment);
  console.log("now", now);
  var dateString = moment(now).format('YYYY-MM-DD');
  console.log(dateString);
  var queryForSlots = "SELECT date_of_appointment, time_of_appointment from available_slots where date_of_appointment=?";
  con.query(queryForSlots, [dateString], function(err, slots) {
    if (err) throw err;
    //res.render("view_appointments", {appointments: results});
    console.log("slots----", slots);
    res.render("book", {slots: slots});
  });
})

app.post("/booking_success", function(req, res) {

  var appointment = {

  }
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.session.email;
  console.log("date_of_appointment", req.body.date_of_appointment);
  console.log("formatted", format.asString('YYYY-MM-DD', new Date()));
  var date_of_appointment = moment(req.body.date_of_appointment).format('YYYY-MM-DD');
  var time_of_appointment = req.body.button;
  var status;

console.log("email", email);
console.log("date_of_appointment", date_of_appointment);
console.log("time_of_appointment", time_of_appointment);


  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  var rString = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  var reference= rString;

    var sql = "INSERT INTO appointments(email, date_of_appointment, time_of_appointment, status,reference) VALUES (?,?,?,?,?)";
    con.query("use covid_assessment_db", function(err, result) {

    });
    con.query(sql, [email, date_of_appointment, time_of_appointment, 'B', reference], function (err, result) {

      if (err) throw err;
      console.log("1 record inserted"+result.insertedId);
    });
    var deleteSql = "DELETE from available_slots where date_of_appointment=? and time_of_appointment=?";
    con.query(deleteSql, [date_of_appointment, time_of_appointment], function (err, result) {

      if (err) throw err;
      console.log("1 record deleted");
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
  con.query(queryString, [req.session.email], function(err, results) {
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
  bcrypt.hash(password, 10, function(err, hash) {
    var sql = "INSERT INTO users(first_name, last_name, dob, gender, address, email, password) VALUES ?";

    var values = [
      [firstName, lastName, birthdayDate, Gender, Address, emailAddress, hash]
    ]

    con.query(sql, [values], function(err, result) {
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
  con.query(queryString, [email], function(err, result) {
    if (err) throw err;
    bcrypt.compare(pwd, result[0].password, function(err, isMatched) {
      // result == true
      if (isMatched) {
        res.render("user_home");
      } else {
        res.render("login.ejs");
      }
    });
  });
});



app.get("/updateprofile", function(req, res) {
  //rest api to get all results
  var sess = req.session;
  var email = sess.email;
  var queryString = "SELECT *, DATE_FORMAT(dob,'%Y-%m-%d') AS niceDate  from users where email=?";
  con.query(queryString, [email], function(err, result){
    if (err) throw err;
    //res.render("signup");
       res.render("updateprofile",{user: result[0]});
    });
  });


app.post("/updatesuccess", function(req, res) {
  var sess = req.session;
  var email = sess.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var birthdayDate = req.body.birthdayDate;
  var Gender = req.body.inlineRadioOptions;
  var Address = req.body.Address;

    var sql = "UPDATE users SET first_name =?, last_name = ?, dob = ?, gender = ?, address = ? WHERE email= ?";



    con.query(sql,[firstName,lastName,birthdayDate,Gender,Address,email], function (err, result) {
      if (err) throw err;
    });
    res.render("updatesuccess");

app.post("/cancel", function(req, res) {
  var queryString = "DELETE from appointments where appointment_id=?";
  console.log("cancelId====", req.body.cancelId);
  con.query(queryString, [req.body.cancelId], function(err, result) {
    if (err) {
      throw err;
    } else {
      var selectQueryString = "SELECT * from appointments where email=?";
      con.query(selectQueryString, [req.session.email], function(err, results) {
        if (err) throw err;
        res.render("view_appointments", {
          appointments: results
        });
      });

    }

  });
});

app.post("/reschedule", function(req, res) {
  var queryString = "UPDATE appointments set datetime_of_appointment=? where appointment_id=?";
  con.query(queryString, [req.body.datetime_of_appointment, req.body.rescheduleId], function(err, result) {
    if (err) {
      throw err;
    } else {
      console.log("success for update");
      var selectQueryString = "SELECT * from appointments where email=?";
      con.query(selectQueryString, [req.session.email], function(err, results) {
        if (err) throw err;
        res.render("view_appointments", {
          appointments: results
        });
      });

    }
  });

});
});

app.get('/signOut',  function (req, res, next)  {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
