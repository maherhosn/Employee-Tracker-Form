import { response } from 'express';
import { pool, connectToDb } from './connection.js';
import { QueryResult } from 'pg';
import CLI from "./Class/Cli.js"

await connectToDb();
// for every selection made in the index folder create a query that would fetch the information from 
// the corresponding classes.
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

function modifyQueryRequest(data: any) {
  const newCli = new CLI();
  pool.query(data, (err, result) => {
    if (err) {
      console.log("Error record not added: "+err);   
      newCli.startCli();
    } else if (result) {
      // console.log(result.rows);
      console.log("Success record was added");
      newCli.startCli();
    }
  });
}

function selectQuery(data: any) {
  console.log("===================");
  console.log("this is the query");
  console.log(data);
  console.log("===================");
  pool.query(data, (err, result) => {
    if (err) {
      console.log(err);
      return "none";
    }
    else if (result) {
      console.log("Successfuly queried the data: " + result.rows);
      return result.rows;
    }
    return "none";
  });
}

export {viewQueryResult, modifyQueryRequest,selectQuery }