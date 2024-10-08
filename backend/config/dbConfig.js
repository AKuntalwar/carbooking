const mysql = require("mysql");
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect(error=>{
    if(error){
        console.log('Error connecting database: ',error);
        throw error;
    }
  });
  

  module.exports ={db};