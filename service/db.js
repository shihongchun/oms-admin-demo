const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'newpassword',
  database: 'oms_user'
})
connection.connect()
const searchUser = 'Select * from user where account="admin"'
function search (sql) {
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      return
    }
    console.log(result[0].password)
  })
}

connection.end()
