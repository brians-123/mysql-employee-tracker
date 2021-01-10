//operation to add a Department record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

module.exports = function addDepartment(departmentName) {
  connection
    .query(
      `INSERT INTO departments (name)
      VALUES ('` +
        departmentName +
        `')`
    )
    .then(console.log("department created"));
};
