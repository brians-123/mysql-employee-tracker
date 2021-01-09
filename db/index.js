//need to resolve this before uncommenting. blocks inquirer
const connection = require("./connection");
//need to resolve this path issue
// const db = require("db");

const addDepartment = require("../operations/addDepartment");
const addRole = require("../operations/addRole");
const addEmployee = require("../operations/addEmployee");

const updateRecords = require("../operations/updateRecords");
const viewRecords = require("../operations/viewRecords");

const inquirer = require("inquirer");
const mysql = require("mysql");

const consoleTable = require("console.table");
const { connect } = require("./connection");

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
const employeeQuery = "SELECT * FROM employees";
const departmentsQuery = "SELECT * FROM departments";
const roleQuery = "SELECT * FROM roles";
//Use inquirer to allow for command line input
function askQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "do you want to add, view or update data?",
        choices: ["add", "view", "update"],
      },
      {
        type: "list",
        name: "tableSelection",
        message: "Which table do you want to use?",
        choices: ["departments", "roles", "employees"],
        when: (answers) =>
          answers.action === "view" || answers.action === "add",
      },

      //----------CREATE----------
      //Create new department. Columns are: name

      {
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?",
        when: (answers) =>
          answers.action === "add" && answers.tableSelection === "departments",
      },

      //Create new role. Columns are: title, salary, department_id
      {
        type: "input",
        name: "titleForRole",
        message: "What title would you like to add?",
        when: (answers) =>
          answers.action === "add" && answers.tableSelection === "roles",
      },
      {
        type: "number",
        name: "salaryForRole",
        message: "What is the yearly salary for this role? Do not add $ symbol",
        when: (answers) => answers.titleForRole !== undefined,
      },
      {
        type: "list",
        name: "departmentForRole",
        message: "What is the department for this role?",
        choices: (answers) =>
          connection.query(departmentsQuery).then((res) => {
            let allOfTheDepartments = res.map((item) => item.id);
            return allOfTheDepartments;
          }),
        when: (answers) => answers.salaryForRole !== undefined,
      },

      //ADD a new employee. columns are first_name, last_name, role_id, manager_id
      {
        type: "input",
        name: "newEmpFirst",
        message: "What is the new employee's first name?",
        when: (answers) =>
          answers.action === "add" && answers.tableSelection === "employees",
      },
      {
        type: "input",
        name: "newEmpLast",
        message: "What is the new employee's last name?",
        when: (answers) =>
          answers.action === "add" && answers.newEmpFirst !== undefined,
      },
      {
        type: "list",
        name: "newEmpRole",
        message: "What is the new employee's role?",
        choices: (answers) =>
          connection.query(roleQuery).then((res) => {
            let allOfTheRoles = res.map((item) => item.id);
            return allOfTheRoles;
          }),
        when: (answers) => answers.newEmpLast !== undefined,
      },
      {
        type: "list",
        name: "newEmpManager",
        message: "Who is the new employee's manager?",
        choices: (answers) =>
          connection.query(employeeQuery).then((res) => {
            let allOfTheEmployees = res.map((item) => item.id);
            return allOfTheEmployees;
          }),
        when: (answers) => answers.newEmpRole !== undefined,
      },

      //----------UPDATE----------
      //UPDATE employee
      {
        type: "list",
        name: "employeeSelection",
        message: "Which employee do you want to update?",
        //currently, this provides the full name. I need it to parse for the first name
        //and last name only, or to have the id saved. The schema did not have a concatenated
        //full name column, so I need to do this in the javascript.
        choices: (answers) =>
          connection.query(employeeQuery).then((res) => {
            let allOfTheNames = res.map(
              (item) => item.first_name + " " + item.last_name
            );
            return allOfTheNames;
          }),
        when: (answers) => answers.action === "update",
      },
      {
        type: "list",
        name: "managerSelection",
        message: "Who should be their new manager?",
        choices: (answers) =>
          connection.query("SELECT * FROM employees").then((res) => {
            let allOfTheManagers = res.map((item) => item.id);
            return allOfTheManagers;
          }),
        when: (answers) => answers.employeeSelection !== undefined,
      },
    ])
    .then((answers) => {
      //----------VIEW----------
      //view the selected table
      if (answers.action === "view") {
        viewRecords(answers.tableSelection);
      }

      //---------UPDATE----------
      //update manager
      if (answers.managerSelection !== null) {
        updateRecords(answers.employeeSelection, answers.managerSelection);
      }

      //----------CREATE----------
      //create a new department
      if (answers.departmentName !== undefined) {
        addDepartment(answers.departmentName);
      }

      //Create a new role
      if (answers.departmentForRole !== undefined) {
        console.log("you are creating a new Role");
        addRole(
          answers.titleForRole,
          answers.salaryForRole,
          answers.departmentForRole
        );
      }

      //create a new employee
      if (answers.newEmpManager !== undefined) {
        console.log("you are creating a new Employee");
        addEmployee(
          answers.newEmpFirst,
          answers.newEmpLast,
          answers.newEmpRole,
          answers.newEmpManager
        );
      }

      connection.end();
    });
}

//start inquirer package
askQuestions();

module.exports = {
  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
};
