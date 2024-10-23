import inquirer from "inquirer";
import { viewQueryResult, modifyQueryRequest } from '../server.js'
import CLI from "../Class/Cli.js"
// WHEN I choose to view all roles
// THEN I am presented with the 
// -- job title, role id, the department that role belongs to, 
// -- and the salary for that role

// write a function that would query the database and return the table 
// with job title, role id, the department that role belongs to, 
// -- and the salary for that role

function ViewRoles(): void {
    const queryString = "Select * from role;";
    viewQueryResult(queryString);
}


//========================================

// WHEN I choose to add a role
// THEN I am prompted to enter 
// -- the name, salary, and department for the role 
// -- and that role is added to the database

// write a function that would connect to the database and insert into the table with a new entry:
// -- the name, salary, and department for the role 
// -- and that role is added to the database

function AddRole(): void {
    const newCli = new CLI();
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleNAme',
                message: 'Enter the title of the role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary',
            },
            {
                type: 'input',
                name: 'depName',
                message: 'Enter the name of the Department associate with the role',
            }
        ])
        .then((answers) => {
            if (answers.roleNAme == "" || answers.salary == "" || answers.depName == "") {
                console.log("Role entries can not be Null")
                newCli.startCli();
            }
            else {
                const queryString = `INSERT INTO role(title, salary, department_id) VALUES ('${answers.roleNAme}',${answers.salary},(select id from department where name ='${answers.depName}'))`;
                modifyQueryRequest(queryString);
            }
        });
}


// function AddRole(): string {
//     let queryString = EnterRoleDetails();
//     return queryString;
// }

export { ViewRoles,AddRole }