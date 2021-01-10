//operation to update an employee's manager in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

module.exports = function updateManager(selectedEmpId, selectedManager) {
  connection
    .query(
      `UPDATE employees 
        SET manager_id = '` +
        selectedManager +
        `' 
        WHERE id = ` +
        "'" +
        selectedEmpId +
        "'"
    )
    .then(console.log("manager updated"));
};
