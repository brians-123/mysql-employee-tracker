const connection = require("./connection");

const addDepartment = require("../operations/addDepartment");
const addRole = require("../operations/addRole");
const addEmployee = require("../operations/addEmployee");

const updateManager = require("../operations/updateManager");
const updateRole = require("../operations/updateRole");
const viewRecords = require("../operations/viewRecords");

const inquirer = require("inquirer");
const mysql = require("mysql");

const consoleTable = require("console.table");

const employeeQuery = "SELECT * FROM employees";
const departmentsQuery = "SELECT * FROM departments";
const roleQuery = "SELECT * FROM roles";

//set a map for the employee first and last, then pull indexOf to get the id
var allOfTheRoles = [];

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
            //We'll parse out the id from the answer later
            let allOfTheDepartments = res.map(
              (item) => "id: " + item.id + " name: " + item.name
            );

            // let allOfTheDepartments = res.map((item) => item.id);
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
            // allOfTheRoles = res.map((item) => item.id);
            let allOfTheRoles = res.map(
              (item) => "id: " + item.id + " title: " + item.title
            );
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
            //We'll parse out the id from the answer later
            let allOfTheEmployees = res.map(
              (item) =>
                "id: " +
                item.id +
                " name: " +
                item.first_name +
                " " +
                item.last_name
            );

            return allOfTheEmployees;
          }),
        when: (answers) => answers.newEmpRole !== undefined,
      },

      //----------UPDATE----------
      //UPDATE employee
      {
        type: "list",
        name: "typeOfUpdate",
        message: "What do you want to update for the employee?",
        choices: ["role", "manager"],
        when: (answers) => answers.action === "update",
      },
      {
        type: "list",
        name: "employeeSelection",
        message: "Which employee do you want to update?",
        choices: (answers) =>
          connection.query(employeeQuery).then((res) => {
            let allOfTheNames = res.map(
              (item) => item.first_name + " " + item.last_name
            );
            return allOfTheNames;
          }),
        when: (answers) => answers.typeOfUpdate !== undefined,
      },
      {
        type: "list",
        name: "updateEmployeeRole",
        message: "Which role should the employee have?",
        choices: (answers) =>
          connection.query(roleQuery).then((res) => {
            let allOfTheRoles = res.map((item) => item.title);
            return allOfTheRoles;
          }),
        when: (answers) =>
          answers.typeOfUpdate === "role" &&
          answers.employeeSelection !== undefined,
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
        when: (answers) =>
          answers.typeOfUpdate === "manager" &&
          answers.employeeSelection !== undefined,
      },
    ])
    .then((answers) => {
      //----------VIEW----------
      //view the selected table
      if (answers.action === "view") {
        viewRecords(answers.tableSelection);
      }

      //---------UPDATE----------
      //update role
      //TO FIX - currently running update employee role
      if (answers.updateEmployeeRole !== undefined) {
        console.log(answers.employeeSelection, answers.updateEmployeeRole);

        // updateRole(answers.employeeSelection, answers.updateEmployeeRole);
      }
      //update employee manager
      if (answers.managerSelection !== undefined) {
        console.log(
          "employee selection" +
            answers.employeeSelection +
            "manager selection" +
            answers.managerSelection
        );
        // updateManager(answers.employeeSelection, answers.managerSelection);
      }

      //----------CREATE----------
      //create a new department
      if (answers.departmentName !== undefined) {
        addDepartment(answers.departmentName);
      }

      //Create a new role
      if (answers.departmentForRole !== undefined) {
        //with the substring functions, we're pulling out just the id
        const departmentForRoleId = answers.departmentForRole.substring(
          4,
          answers.departmentForRole.indexOf(" name:")
        );

        addRole(
          answers.titleForRole,
          answers.salaryForRole,
          departmentForRoleId
        );
      }

      //create a new employee
      if (answers.newEmpManager !== undefined) {
        //with the substring functions, we're pulling out just the id
        const newEmpManagerId = answers.newEmpManager.substring(
          4,
          answers.newEmpManager.indexOf(" name:")
        );
        const newEmpRoleId = answers.newEmpRole.substring(
          4,
          answers.newEmpRole.indexOf(" title:")
        );
        console.log("new emp role id" + newEmpRoleId + "asfd");
        console.log("new emp manager id" + newEmpManagerId + "asfd");

        addEmployee(
          answers.newEmpFirst,
          answers.newEmpLast,
          newEmpRoleId,
          newEmpManagerId
        );
      }

      connection.end();
    });
}

//start inquirer package
askQuestions();
