//need to resolve this before uncommenting. blocks inquirer
const connection = require("./connection");
//need to resolve this path issue
// const db = require("db");

const addRecord = require("../operations/addRecords");
const updateRecord = require("../operations/updateRecords");
const viewRecord = require("../operations/viewRecords");

const inquirer = require("inquirer");
const mysql = require("mysql");

const consoleTable = require("console.table");
const { connect } = require("./connection");
const viewRecords = require("../operations/viewRecords");
const actionQuestion = {
  type: "list",
  name: "action",
  message: "do you want to add, view or update data?",
  choices: ["add", "view", "update"],
};

//inquirer choices
//note that the only requirement of user story is to update employee roles

//function to query existing data. used for view and update
function queryData(theTable, theField, theCriteria) {
  //code goes here
}

//function to insert new record
function insertData(theTable, theField, newValue) {
  //code goes here
}

//function to update existing data
function updateData(theTable, theField, theCriteria) {
  //code goes here
  queryData(theTable, theField, theCriteria);
  //pass in the new value to update the database
}
//example using console.table
const queryTest = "SELECT * FROM employees";
const queryOutput = connection.query(queryTest).then((res) => {
  // console.table(res);
});
// console.log("test here: " + queryOutput);

//Use inquirer to allow for command line input
function askQuestions() {
  inquirer
    .prompt([
      actionQuestion,
      //code here
      //which table do you want to use

      {
        type: "list",
        name: "tableSelection",
        message: "Which table do you want to use?",
        choices: ["departments", "roles", "employees"],
        when: (answers) =>
          answers.action === "view" || answers.action === "add",
      },
      {
        type: "list",
        name: "employeeSelection",
        message: "Which employee do you want to update?",
        choices: (answers) =>
          connection.query(queryTest).then((res) => {
            let allOfTheNames = res.map((item) => item.first_name);
            return allOfTheNames;
          }),
        when: (answers) => answers.action === "update",
      },

      //
    ])
    .then((answers) => {
      if (answers.action === "add" || answers.action === "view") {
        console.log("you selected add or view");
      } else {
        console.log("you selected update");
        connection.query(queryTest).then((res) => {
          console.log(res);
          // console.log(res[0].first_name);
          for (var i = 0; i < res.length; i++) {
            console.log("print i" + res[i].first_name);
          }
          // console.log(res.first_name);
        });
      }
      if (answers.action === "view") {
        console.log(answers.tableSelection);
        viewRecords(answers.tableSelection);
      }
      if (answers.action === "add") {
      }
      connection.end();
    });
}

askQuestions();

//working example of console.table

module.exports = {
  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
};