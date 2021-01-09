//operation to add a record in the database
const mySQL = require("mysql");
const connection = require("../db/connection");

/*proof of concept to add records to the department table*/
module.exports = function addDepartment(departmentName) {
  console.log("here is the department name: " + departmentName);
  connection
    .query(
      `INSERT INTO departments (name)
      VALUES ('` +
        departmentName +
        `')`
    )
    .then(console.log("department created"));
};
