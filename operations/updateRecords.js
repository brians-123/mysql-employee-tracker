//operation to update a record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

/*proof of concept to update records name of an employee' */
/*
module.exports = function updateRecords(employeeName) {
    connection
      .query(
        `UPDATE employees 
        SET first_name = 'testFirst' 
        WHERE first_name = ` +
          "'" +
          employeeName +
          "'"
      )
      .then(console.log("done"));
    //   console.log("done");
  };
*/

module.exports = function updateRecords(employeeName, selectedManager) {
  console.log(
    "here is the employeeName: " + employeeName,
    "here is the managerName: " + selectedManager
  );
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
