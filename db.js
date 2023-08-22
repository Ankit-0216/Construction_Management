const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;

// const pgp = require("pg-promise")();
// const db = pgp({
//   connectionString:
//     "postgres://postgres:qwerty@localhost:5432/Project_Management",
// });

// module.exports = db;
