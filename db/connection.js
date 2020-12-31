const mysql = require("mysql");
// const { createConnection } = require("net");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  //port for mySQL
  port: 3306,
  //mySQL username
  user: "root",
  //password
  password: "@nother_$equel1",
  //name of database
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id: " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;
