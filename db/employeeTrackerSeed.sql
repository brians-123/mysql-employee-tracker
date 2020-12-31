INSERT INTO departments(name)
VALUES ("Sales"),
VALUES ("Accounting");

INSERT INTO roles(title,  salary, department_id)
VALUES ("Sr. Director - Sales", 200000, 1),
VALUES ("Sales Operations Analyst", 100000, 1),
VALUES ("VP Finance", 250000, 2),
VALUES ("Finance Analyst", 80000, 2);

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
  
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Builder", 1, null),
("John", "Smith", 1, 12),
("Sally", "Something", 2, null),
("Jennifer", "Jewel", 2, 14);

SELECT * FROM employees

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