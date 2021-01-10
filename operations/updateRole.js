//operation to update a record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

/*update employee role' */

module.exports = function updateRole(employeeName, role_id) {
  connection
    .query(
      `UPDATE employees 
        SET role_id = '` +
        role_id +
        `' 
        WHERE first_name = ` +
        "'" +
        employeeName +
        "'"
    )
    .then(console.log("role updated"));
};
