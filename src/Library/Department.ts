import inquirer from "inquirer";
import CLI from "../Class/Cli.js"
import { viewQueryResult, modifyQueryRequest, getQueryRequest } from '../server.js'

// WHEN I choose to view all departments THEN I am presented with a formatted table showing:-- department names and department ids
function ViewDepartments(): void {
    const queryString = "Select * from department;"; //db query sent to database through server connections 
    viewQueryResult(queryString); // simulates a table view of the selected table
}

// WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
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

//This async function waits for data from the database to be parsed as choice values for the user
async function getDepartments() {
    const queryString = "select name, id from department;"
    const rows = await getQueryRequest(queryString);
    const formatRows = rows.map(row => ({
        name: row.name,
        value: row.id,
    }));
    return formatRows;
}

export { ViewDepartments, AddDepartment, getDepartments }