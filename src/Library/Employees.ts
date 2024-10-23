import { viewQueryResult, modifyQueryRequest } from '../server.js'
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including:
// -- employee ids, first names, last names, job titles, 
// -- departments, salaries, and managers that the employees report to


// write a function that would query the database and return the table with
// with employee ids, first names, last names, job titles, 
// departments, salaries, and managers that the employees report to

function ViewEmployees():void{
    const queryString = "Select * from employee;";
    viewQueryResult(queryString);
}
// =====================================================

// WHEN I choose to add an employee
// THEN I am prompted to enter:
// --  the employee’s first name, last name, role, and manager, 
// -- and that employee is added to the database

// write a function that would connect to the database and insert into the table with a new entry:
// --  the employee’s first name, last name, role, and manager, 
// -- and that employee is added to the database

function AddEmployee(fName: any,lName: any ,roleID: any ,managerID: any):string{
    const queryString =`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES  ("${fName}","${lName}",${roleID},${managerID});`
return queryString;
}

// =================================================
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// write a function that would connect to the database and:
// 1 (perform a select query to return all the employees and display it as a choise for the user to select)
// 2 (allow the user to update the employees details,)
// 3 (Create a query to update the database table with that information)

export {ViewEmployees, AddEmployee}

