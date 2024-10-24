import { pool, connectToDb } from './connection.js';
import CLI from "./Class/Cli.js"


await connectToDb();

// The following function handles all queries where the full table is needs to be viewed by the user
function viewQueryResult(data: any) {
  const newCli = new CLI();
  pool.query(data, (err, result) => {
    if (err) {
      console.log(err);
      newCli.startCli();
    }
    else if (result) {
      console.log("=============================");
      console.table(result.rows);
      console.log("=============================");
      newCli.startCli();
    }
  });
}

//The following query command handles all inserts, updates and alters when the user want to change/modify something in the database tables
function modifyQueryRequest(data: any) {
  const newCli = new CLI();
  pool.query(data, (err, result) => {
    if (err) {
      console.log("Error record not added: " + err);
      newCli.startCli();
    } else if (result) {
      // console.log(result.rows);
      console.log("Success record was added");
      newCli.startCli();
    }
  });
}

//The following function handles specific select statements based on certain values within a table and returns tha values to be parsed.
async function getQueryRequest(data: string) {
  try {
    const res = await pool.query(data);
    return res.rows;
  } catch (error) {
    console.error('Error executing query', error);
    return [];
  } 
}

  export { viewQueryResult, modifyQueryRequest, getQueryRequest }