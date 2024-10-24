import inquirer from "inquirer";
import { viewQueryResult, modifyQueryRequest, getQueryRequest } from '../server.js';
import { getDepartments } from './Department.js';
import CLI from "../Class/Cli.js";


// WHEN I choose to view all roles THEN I am presented with the -- job title, role id, the department that role belongs to, -- and the salary for that role
function ViewRoles(): void {
    const queryString = "Select * from role;";
    viewQueryResult(queryString);
}

// WHEN I choose to add a role THEN I am prompted to enter -- the name, salary, and department for the role  -- and that role is added to the database
async function AddRole() {
    const newCli = new CLI();
    const depChoices = await getDepartments();
    if (depChoices) {
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
                    type: 'list',
                    name: 'depName',
                    message: 'Select the Department for this role',
                    choices: depChoices,
                }
            ])
            .then((answers) => {
                if (answers.roleNAme == "" || answers.salary == "" || answers.depName == "") {
                    console.log("Role entries can not be Null")
                    newCli.startCli();
                }
                else {
                    const queryString = `INSERT INTO role(title, salary, department_id) VALUES ('${answers.roleNAme}',${answers.salary},${answers.depName})`;
                    modifyQueryRequest(queryString);
                }
            });
    }
}

//This async function waits for data from the database to be parsed as choice values for the user
async function getRoleChoices() {
    const queryString = "select title, id from role;"
    const rows = await getQueryRequest(queryString);
    const formatRows = rows.map(row => ({
        name: row.title,
        value: row.id,
    }));
    return formatRows;
}

export { ViewRoles, AddRole, getRoleChoices }