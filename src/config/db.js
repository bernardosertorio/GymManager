const { Pool } = require("pg") // conecção com o banco de dados 

module.exports = new Pool({
  user: 'bernardosertorio',
  password: "",
  host: "localhost",
  port: 5432,
  database: "gymmanager"
})