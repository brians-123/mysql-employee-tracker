//operation to update an employee's role in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

module.exports = function updateRole(employeeId, role_id) {
  connection
    .query(
      `UPDATE employees 
        SET role_id = '` +
        role_id +
        `' 
        WHERE id = ` +
        "'" +
        employeeId +
        "'"
    )
    .then(console.log("role updated"));
};
