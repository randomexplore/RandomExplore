
const db = require('mysql')

const con = db.createConnection({
    host:process.env.DB_HT,
    user:process.env.DB_UR,
    password: process.env.DB_PD,
    database:process.env.DB_NM
  });
  
module.exports = con