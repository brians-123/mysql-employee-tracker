//operation to add an Employee record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

module.exports = function addEmployee(
  first_name,
  last_name,
  role_id,
  manager_id
) {
  connection
    .query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES ('` +
        first_name +
        `', '` +
        last_name +
        `', ` +
        role_id +
        `, ` +
        manager_id +
        `)`
    )
    .then(console.log("employee created"));
};
