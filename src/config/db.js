const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Zeeshan@2221",
  database: "auth_db",
});

module.exports = pool.promise();
