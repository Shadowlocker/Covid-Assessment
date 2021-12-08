create database covid_assessment_db;

show databases;

use covid_assessment_db;

CREATE TABLE users (ID int NOT NULL AUTO_INCREMENT,
first_name VARCHAR(50), last_name VARCHAR(50),
dob DATE, gender CHAR(1), address VARCHAR(500), email VARCHAR(100),
password VARCHAR(255),
PRIMARY KEY (ID)
);

create table appointments (appointment_id int NOT NULL AUTO_INCREMENT,
email VARCHAR(100),
date_of_appointment date,
 time_of_appointment VARCHAR(50), status CHAR(1), reference varchar(50), PRIMARY KEY (appointment_id)
);

insert into appointments (first_name, last_name, email, datetime_of_appointment, status)
values ("rinky", "fulwani", "r@gmail.com", "2021-11-02 10:30:59", "B");
insert into appointments (first_name, last_name, email, datetime_of_appointment, status)
values ("rinky", "fulwani", "r@gmail.com", "2021-11-10 10:30:59", "U");
insert into appointments (first_name, last_name, email, datetime_of_appointment, status)
values ("rinky", "fulwani", "r@gmail.com", "2021-11-02 10:30:59.999", "C");
values ("rinky", "fulwani", "r@gmail.com", "2021-11-02 10:30:59", "C");

CREATE TABLE results (
  results_ID int NOT NULL,
  user_ID varchar(45) NOT NULL,
  appointment_id varchar(45) NOT NULL,
  appointment_date varchar(45) NOT NULL,
  results_fileName varchar(45) NOT NULL,
  results_date varchar(45) NOT NULL,
  PRIMARY KEY (results_ID)
);
insert into results (results_ID, user_ID, appointment_id, appointment_date, results_fileName, results_date, status)
values ("1","4","24","11/10/2021 10:00 AM","result1.txt","11/10/2021 11:00 AM");


create table available_slots (id int NOT NULL AUTO_INCREMENT, date_of_appointment date,
time_of_appointment varchar(50), PRIMARY KEY (id));

insert into available_slots (date_of_appointment, time_of_appointment) values ("2021-12-08", "11:00");
insert into available_slots (date_of_appointment, time_of_appointment) values ("2021-12-08", "11:30");
insert into available_slots (date_of_appointment, time_of_appointment) values ("2021-12-08", "12:00");
insert into available_slots (date_of_appointment, time_of_appointment) values ("2021-12-08", "12:30");
insert into available_slots (date_of_appointment, time_of_appointment) values ("2021-12-09", "13:00");
insert into available_slots (date_of_appointment, time_of_appointment) values ("2021-12-09", "13:30");

CREATE TABLE final_results (
  results_ID int NOT NULL,
  email varchar(45) NOT NULL,
  appointment_id varchar(45) NOT NULL,
  appointment_date varchar(45) NOT NULL,
  results_date varchar(45) NOT NULL,
  result varchar(45) DEFAULT NULL,
  PRIMARY KEY (results_ID,appointment_date,appointment_id)
);

insert into final_results (email, appointment_id, appointment_date, results_date, result) values ("abcd@gmail.com", "oz1B7bOE", "2021-12-10",
"2021-12-11", "Negative");
