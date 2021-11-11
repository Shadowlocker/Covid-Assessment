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
first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100),
datetime_of_appointment datetime, status CHAR(1), PRIMARY KEY (appointment_id)
);

insert into appointments (first_name, last_name, email, datetime_of_appointment, status)
values ("rinky", "fulwani", "r@gmail.com", "2021-11-02 10:30:59.999", "B");
insert into appointments (first_name, last_name, email, datetime_of_appointment, status)
values ("rinky", "fulwani", "r@gmail.com", "2021-11-10 10:30:59.999", "U");
insert into appointments (first_name, last_name, email, datetime_of_appointment, status)
values ("rinky", "fulwani", "r@gmail.com", "2021-11-02 10:30:59.999", "C");

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

