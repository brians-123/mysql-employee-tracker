# MySQL Employee Tracker

## Table of Contents :book:

- [Description](#description)
- [User Story](#user-story)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contribute)
- [Tests](#tests)
- [Questions](#questions)

## Description <a id="description"></a> :page_facing_up:

This project uses a mysql database to store employee, role, and department data. Users can interact with the database through the terminal and the npm inquirer package to

- CREATE departments, roles and employees.
- UPDATE employee roles
- VIEW departments, roles and employees.

  This project has operations separated into separate folders that are exported into the main index.js file. It also utilizes jest tests which will pass if there is more than one record in each table. The viewing of tables in a clean format is through the use of the console.table npm package.

## User Story <a id="user-story"></a> :woman:

- AS AN HR Manager,
- I WANT to be able to store and manage departments roles and employees when changes occur in our organization
- SO THAT I can process payroll properly

## Installation <a id="installation"></a> :floppy_disk:

- Install the LTS version of node https://nodejs.org/en/
- Download this repository from github
- Go to the terminal and type 'install npm' then hit enter
- Wait for the installation to complete then hit enter

## Usage <a id="usage"></a> :computer:

- This program must be run in your terminal with the following command `bash node index.js `
- Run through the list of questions hitting enter after each answer

## License <a id="license"></a> :copyright:

None

## Contribute <a id="contribute"></a> :heavy_plus_sign: :heavy_plus_sign:

You should not contribute to this repository

## Tests <a id="tests"></a> :microscope:

There is one working jest test suite for viewing records. It will pass if there is 1 or more records per table

## Contact <a id="questions"></a> :email:

[github account](https://github.com/brians-123)
