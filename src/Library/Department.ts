import inquirer from "inquirer";
import { selectQuery } from "../server.js";
import CLI from "../Class/Cli.js"
import { viewQueryResult, modifyQueryRequest } from '../server.js'
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing:
// -- department names and department ids

// write a function that would query the database and return the table with
// with department names and department ids

function ViewDepartments(): void {
    const queryString = "Select * from department;";
    viewQueryResult(queryString);
}

//==================================

// WHEN I choose to add a department
// THEN I am prompted to enter:
// the name of the department and that department is added to the database

// write a function that would connect to the database and insert into the table with a new entry:
// he name of the department and that department is added to the database

function AddDepartment(): void {
    const newCli = new CLI();
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'depName',
                message: 'Enter the name of the Department',
            },
        ])
        .then((answer) => {
            if (answer.depName == "") {
                console.log("Department name can not be null")
                newCli.startCli();
            }
            else {
                const queryString = `INSERT INTO department (name) VALUES ('${answer.depName}');`
                console.log("=============================");
                modifyQueryRequest(queryString);
            }
        });
}

export {ViewDepartments, AddDepartment}