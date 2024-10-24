// AS A business owner
// I WANT to be able to view and manage 
// the departments, roles, and employees in my company
// SO THAT I can organize and plan my business

//import the poper packages and link the Classes together
import inquirer from 'inquirer';
import { ViewDepartments, AddDepartment } from '../Library/Department.js'
import { ViewEmployees, AddEmployee } from '../Library/Employees.js'
import { ViewRoles,AddRole } from '../Library/Role.js'

// WHEN I start the application
// THEN I am presented with the following options: 
// -- view all departments, view all roles, view all employees, 
// -- add a department, add a role, add an employee, and update an employee role
class Cli {
    constructor() { };

    startCli(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Select an action',
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
                    AddEmployee();
                } else if (answers.action === 'Update an Employee Role') {
                } else {
                    // exit the cli if the user selects exit
                    process.exit(1);
                }
            });
    }
}

// Start the application:
const cli =new Cli();
cli.startCli();

export default Cli;

