const mysql = require("mysql");

const db = mysql.createConnection({
   host: "localhost",
   database: "perpustakaan",
   user: "root",
   password: "",
});

module.exports = db;
