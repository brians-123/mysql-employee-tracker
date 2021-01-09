//operation to add a record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

//add records to the roles table
module.exports = function addRole(title, salary, department_id) {
  console.log(
    `INSERT INTO roles (title, salary, department_id)
    VALUES ('` +
      title +
      `', ` +
      salary +
      `, ` +
      department_id +
      `)`
  );
  console.log("here is the new role's title: " + title);
  connection
    .query(
      `INSERT INTO roles (title, salary, department_id)
          VALUES ('` +
        title +
        `', ` +
        salary +
        `, ` +
        department_id +
        `)`
    )
    .then(console.log("role created"));
};
