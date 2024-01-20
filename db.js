const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'node_db',
})

module.exports = pool

const connectDB = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

module.exports = connectDB
