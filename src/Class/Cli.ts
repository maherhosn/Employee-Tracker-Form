// AS A business owner
// I WANT to be able to view and manage 
// the departments, roles, and employees in my company
// SO THAT I can organize and plan my business

//import the poper packages and link the Classes together

// GIVEN a command-line application that accepts user input

// WHEN I start the application
// THEN I am presented with the following options: 
// -- view all departments, view all roles, view all employees, 
// -- add a department, add a role, add an employee, and update an employee role

// Write a functin to connect to the Departments classes when the user selects anything anything
// related to the department will be handled by the department.ts in the classes folder

// Write a functin to connect to the employees classes when the user selects anything anything
// related to the employees will be handled by the employees.ts in the classes folder

// Write a functin to connect to the roles classes when the user selects anything anything
// related to the roles will be handled by the roles.ts in the classes folder
import inquirer from 'inquirer';
import { viewQueryResult, modifyQueryRequest } from '../server.js'
import { ViewDepartments, AddDepartment } from '../Library/Department.js'
import { ViewEmployees, AddEmployee } from '../Library/Employees.js'
import { ViewRoles,AddRole } from '../Library/Role.js'

class Cli {
    constructor() { };

    // TODO: start the CLI;
    startCli(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Select an action',
                    // TODO: add options to tow and wheelie
                    choices: [
                        "View All Departments",
                        "View All Roles",
                        "View All Employees",
                        "Add a Department",
                        "Add a Role",
                        "Add an Employee",
                        "Update an Employee Role",
                        "Exit"
                    ]
                },
            ])
            .then((answers) => {
                if (answers.action === 'View All Departments') {
                    ViewDepartments();
                } else if (answers.action === 'View All Roles') {
                    ViewRoles();
                } else if (answers.action === 'View All Employees') {
                    ViewEmployees();
                } else if (answers.action === 'Add a Department') {
                    AddDepartment();
                } else if (answers.action === 'Add a Role') {
                    AddRole();
                } else if (answers.action === 'Add an Employee') {
                } else if (answers.action === 'Update an Employee Role') {
                } else {
                    // exit the cli if the user selects exit
                    process.exit(1);
                }
            });
    }
}

const cli =new Cli();
cli.startCli();

export default Cli;

