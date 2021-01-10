//operation to update a record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

/*update employee manager' */
//need to fix query's where criteria to use an id field instead.

module.exports = function updateManager(employeeName, selectedManager) {
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
    .then(console.log("manager updated"));
};
