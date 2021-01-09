//operation to update a record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

/*update employee manager' */

module.exports = function updateRecords(employeeName, selectedManager) {
  connection
    .query(
      `UPDATE employees 
        SET manager_id = '` +
        selectedManager +
        `' 
        WHERE first_name = ` +
        "'" +
        employeeName +
        "'"
    )
    .then(console.log("role updated"));
};
