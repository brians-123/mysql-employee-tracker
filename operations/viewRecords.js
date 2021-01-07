//operation to query the database with a select statement
const mySQL = require("mysql");
const connection = require("../db/connection");

module.exports = function viewRecords(tableName) {
  console.log(tableName);
  connection.query("SELECT * FROM " + tableName).then((tableName) => {
    console.table(tableName);
  });
};
