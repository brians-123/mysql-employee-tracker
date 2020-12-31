/* drop the database if it exists */
DROP DATABASE IF EXISTS employee_db;
/* Create employee database */
CREATE DATABASE employee_db;
/* use database to insert schema and records. doesn't work w/plugin*/
USE employee_db;
/* create new tables */
CREATE TABLE departments(
  name VARCHAR (30) NOT NULL,
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
  );

CREATE TABLE roles(
  title VARCHAR (30) NOT NULL,
  salary DECIMAL (10,2),
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id) 
  );

CREATE TABLE employees(
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,  
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id) 
  );