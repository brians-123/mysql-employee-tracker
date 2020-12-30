//need to resolve this before uncommenting. blocks inquirer
// const connection = require("./connection");
//need to resolve this path issue
// const db = require("db");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//inquirer choices
const action = ["add data", "view data", "delete data"];

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

//Use inquirer to allow for command line input
inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "do you want to add, view or update data?",
      choices: action,
    },
    //   //code here
    //   //which table do you want to use?
    //   //code here
  ])
  .then((answers) => {
    console.log("test");
    //determine which function to use with switch case
  });

module.exports = {
  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
};
