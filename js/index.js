const connection = require("../db/connection");

const addDepartment = require("../operations/addDepartment");
const addRole = require("../operations/addRole");
const addEmployee = require("../operations/addEmployee");
const updateManager = require("../operations/updateManager");
const updateRole = require("../operations/updateRole");
const viewRecords = require("../operations/viewRecords");

const inquirer = require("inquirer");
const mysql = require("mysql");

const employeeQuery = "SELECT * FROM employees";
const departmentsQuery = "SELECT * FROM departments";
const roleQuery = "SELECT * FROM roles";

//Does a null check and skips the manager prompt if it's the first employee
let empNullCheck = [];
empNullCheck = connection.query(
  "SELECT id FROM employees LIMIT 1",
  (err, result) => {
    if (err) {
      throw err;
    } else {
      setValue(result);
    }
  }
);

function setValue(value) {
  empNullCheck = value;
  //launches the questions
  askQuestions();
}

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
      //CREATE new department. Columns are: name
      {
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?",
        when: (answers) =>
          answers.action === "add" && answers.tableSelection === "departments",
      },

      //CREATE new role. Columns are: title, salary, department_id
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
        when: (answers) => answers.titleForRole,
      },
      {
        type: "list",
        name: "departmentForRole",
        message: "What is the department for this role?",
        choices: (answers) =>
          connection.query(departmentsQuery).then((res) => {
            //We'll pull out the id from the answer later
            let allOfTheDepartments = res.map(
              (item) => "id: " + item.id + " name: " + item.name
            );
            return allOfTheDepartments;
          }),
        when: (answers) => answers.salaryForRole,
      },

      //CREATE new employee. columns are first_name, last_name, role_id, manager_id
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
        when: (answers) => answers.action === "add" && answers.newEmpFirst,
      },
      {
        type: "list",
        name: "newEmpRole",
        message: "What is the new employee's role?",
        choices: (answers) =>
          connection.query(roleQuery).then((res) => {
            //We'll pull out the id from the answer later
            let allOfTheRoles = res.map(
              (item) => "id: " + item.id + " title: " + item.title
            );
            return allOfTheRoles;
          }),
        when: (answers) => answers.newEmpLast,
      },
      {
        type: "list",
        name: "newEmpManager",
        message: "Who is the new employee's manager?",
        choices: (answers) =>
          //ideas
          // make default a specific value
          connection.query(employeeQuery).then((res) => {
            //We'll pull out the id from the answer later
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
        when: (answers) => answers.newEmpRole && empNullCheck.length != 0,
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
            //We'll pull out the id from the answer later
            let allOfTheNames = res.map(
              (item) =>
                "id: " +
                item.id +
                " name: " +
                item.first_name +
                " " +
                item.last_name
            );
            return allOfTheNames;
          }),
        when: (answers) => answers.typeOfUpdate,
      },
      {
        type: "list",
        name: "updateEmployeeRole",
        message: "Which role should the employee have?",
        choices: (answers) =>
          connection.query(roleQuery).then((res) => {
            //We'll pull out the id from the answer later
            let allOfTheRoles = res.map(
              (item) => "id: " + item.id + " title: " + item.title
            );
            return allOfTheRoles;
          }),
        when: (answers) =>
          answers.typeOfUpdate === "role" && answers.employeeSelection,
      },
      {
        type: "list",
        name: "managerSelection",
        message: "Who should be their new manager?",
        choices: (answers) =>
          connection.query("SELECT * FROM employees").then((res) => {
            //We'll pull out the id from the answer later
            let allOfTheManagers = res.map(
              (item) =>
                "id: " +
                item.id +
                " name: " +
                item.first_name +
                " " +
                item.last_name
            );
            return allOfTheManagers;
          }),

        when: (answers) =>
          answers.typeOfUpdate === "manager" && answers.employeeSelection,
      },
    ])
    .then((answers) => {
      //----------VIEW----------
      //VIEW the selected table
      if (answers.action === "view") {
        viewRecords(answers.tableSelection);
      }

      //---------UPDATE----------
      //UPDATE role
      if (answers.updateEmployeeRole) {
        const updateEmpRoleEmpId = answers.employeeSelection.substring(
          4,
          answers.employeeSelection.indexOf(" name:")
        );
        const updateEmpRoleRoleId = answers.updateEmployeeRole.substring(
          4,
          answers.updateEmployeeRole.indexOf(" title:")
        );
        updateRole(updateEmpRoleEmpId, updateEmpRoleRoleId);
      }

      //UPDATE employee manager
      if (answers.managerSelection) {
        const updateMgrEmpId = answers.employeeSelection.substring(
          4,
          answers.employeeSelection.indexOf(" name:")
        );
        const updateMgrMgrId = answers.managerSelection.substring(
          4,
          answers.managerSelection.indexOf(" name:")
        );
        updateManager(updateMgrEmpId, updateMgrMgrId);
      }

      //----------CREATE----------
      //CREATE a new department
      if (answers.departmentName) {
        addDepartment(answers.departmentName);
      }

      //CREATE a new role
      if (answers.departmentForRole) {
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

      //CREATE a new employee

      if (
        answers.newEmpManager ||
        (answers.newEmpRole && empNullCheck.length == 0)
      ) {
        //with the substring functions, we're pulling out just the id
        let newEmpManagerId = null;

        if (empNullCheck.length != 0) {
          newEmpManagerId = answers.newEmpManager.substring(
            4,
            answers.newEmpManager.indexOf(" name:")
          );
        }
        {
          const newEmpRoleId = answers.newEmpRole.substring(
            4,
            answers.newEmpRole.indexOf(" title:")
          );

          addEmployee(
            answers.newEmpFirst,
            answers.newEmpLast,
            newEmpRoleId,
            newEmpManagerId
          );
        }
      }
      connection.end();
    });
}
