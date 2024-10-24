import inquirer from "inquirer";
import { viewQueryResult, modifyQueryRequest,getQueryRequest } from '../server.js';
import CLI from "../Class/Cli.js";
import {getRoleChoices} from './Role.js';

// WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including: -- employee ids, first names, last names, job titles, -- departments, salaries, and managers that the employees report to
function ViewEmployees():void{
    const queryString = "Select * from employee;";
    viewQueryResult(queryString);
}

// WHEN I choose to add an employee
// THEN I am prompted to enter:
// --  the employee’s first name, last name, role, and manager, 
// -- and that employee is added to the database
async function AddEmployee() {
    const newCli = new CLI();
    
    const roleChoices = await getRoleChoices();
    
    const managerChoices = await getManagerChoices();
    managerChoices.unshift({
        name: "None",
        value: "Null",
    });

    if (roleChoices && managerChoices) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the First Name of the employee',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the Last Name of the employee',
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: 'Select the Employee Role',
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: 'Select the Employee Manager',
                    choices: managerChoices,
                }
            ])
            .then((answers) => {
                if (answers.firstName == "" || answers.lastName == "" || answers.empRole == "") {
                    console.log("Employee entries can not be Null")
                    newCli.startCli();
                }
                else {
                        const queryString = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES  ('${answers.firstName}','${answers.lastName}',${answers.empRole},${answers.empManager})`;
                        modifyQueryRequest(queryString);                   
                }
            });
    }
}


// =================================================
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
async function UpdateEmployee() {
    const newCli = new CLI();
    const employeeChoices = await getManagerChoices();
    const roleChoices = await getRoleChoices();
    if (roleChoices && employeeChoices) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'empName',
                    message: 'Select the Employee you wish to update',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'emplRole',
                    message: 'Select the Employee new Role',
                    choices: roleChoices,
                }
            ])
            .then((answers) => {
                if (answers.empName == "" || answers.emplRole=="") {
                    console.log("Employee entries can not be Null")
                    newCli.startCli();
                }
                else {
                        const queryString = `Update employee set role_id=${answers.emplRole} where id=${answers.empName};`;
                        modifyQueryRequest(queryString);                   
                }
            });
    }
}

//This async function waits for data from the database to be parsed as choice values for the user
async function getManagerChoices() {
    const queryString = "select first_name, last_name, id from employee;"
    const rows = await getQueryRequest(queryString);
    const formatRows = rows.map(row => ({
        name: row.first_name+" "+row.last_name,
        value: row.id,
    }));
    console.log(formatRows);
    return formatRows;
}

export {ViewEmployees, AddEmployee, UpdateEmployee}

