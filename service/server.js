const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const mysql = require('mysql')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors({
  origin: '*',
  credentials: true,
  maxAge: '1728000'
}))
app.use(cookieParser('sessionUserId'))
app.use(session({
  secret: 'sessionUserId',
  resave: false,
  sameSite: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'newpassword',
  database: 'oms_user'
})
connection.connect()
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
//   if (req.method === 'OPTIONS') {
//     /* 让options请求快速返回 */
//     res.send(200)
//   } else {
//     next()
//   }
// })
// const sql_user = 'Select * from user where account=?'
app.post('/api/user', (req, res) => {
  console.log(req)
  console.log(123)
  connection.query('Select * from user', function (err, result) {
    if (err) {
      console.log(err)
      return
    }
    res.send({
      status: 1,
      data: result
    })
  })
})
app.get('/api/countmember', (req, res) => {
  connection.query('SELECT type,count(type) as count from member group by type', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    res.send({
      status: 1,
      data: result
    })
  })
})
app.get('/api/getactivity', (req, res) => {
  let sql = `select activity_name,issuer_name,max_number,activity_range,activity_kind,activity_des,activity_type,activity_id,DATE_FORMAT(activity_date, '%Y-%m-%d') as date from activity`
  connection.query(sql, (err, result) => {
    if (err) {
      return
    }
    res.send({
      status: 1,
      data: result
    })
  })
})

app.get('/api/getaddcount', (req, res) => {
  let newDate = (new Date().getTime() - 7 * 24 * 3600 * 1000) / 1000
  let sql = `select count(id) as count,source,DATE_FORMAT(add_time, '%Y%m%d') as date from member where unix_timestamp(add_time) > ${newDate} group by DATE_FORMAT(add_time, '%Y%m%d'),source`
  connection.query(sql, (err, result) => {
    if (err) {
      return
    }
    res.send({
      status: 1,
      data: result
    })
  })
})
app.get('/api/getreacent', (req, res) => {
  let newDate = (new Date().getTime() - 7 * 24 * 3600 * 1000) / 1000
  let sql = `select count(id) as count,type,DATE_FORMAT(add_time, '%Y%m%d') as date from member where unix_timestamp(add_time) > ${newDate} group by DATE_FORMAT(add_time, '%Y%m%d'),type`
  //   const sql = `SELECT unix_timestamp(add_time) as date,type,count(type) as count from member where unix_timestamp(add_time) > ${date} and DATE_FORMAT(add_time, '%Y%m%d') in( select DATE_FORMAT(add_time, '%Y%m%d') from member where unix_timestamp(add_time) > ${date} group by id)
  // group by id`
  connection.query(sql, (err, result) => {
    if (err) {
      return
    }
    res.send({
      status: 1,
      data: result
    })
  })
})
app.post('/api/member', (req, res) => {
  console.log(req.body)
  const body = req.body
  let num = 0
  let sql = 'Select DATE_FORMAT(add_time,"%Y-%m-%d") as date,name,tel,sex,age,type,source,address from member where'
  let params = []
  var ser = ''
  for (let i in body) {
    if (body[i] !== '' && i !== 'page') {
      ser += ` ${i}=?and `
      params.push(body[i])
    }
  }
  sql = sql + ser
  if (sql.slice(-6) === ' where') {
    sql = 'Select DATE_FORMAT(add_time,"%Y-%m-%d") as date,name,tel,sex,age,type,source,address from member'
  } else {
    sql = sql.slice(0, -4)
  }
  sql = sql + ` limit ${(body['page'] - 1) * 10},10`
  var sqlA = 'select count(*) as num from member where'
  sqlA = sqlA + ser
  if (sqlA.slice(-6) === ' where') {
    sqlA = 'select count(*) as num from member'
  } else {
    sqlA = sql.slice(0, -4)
  }
  connection.query(sqlA, function (err, result) {
    if (err) {
      return
    }
    num = result[0].num
  })
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err)
      res.send({
        status: 0
      })
      return
    }
    res.send({
      'status': 1,
      data: result,
      page: num
    })
  })
})
app.get('/api/getuser', (req, res) => {
  const params = req.query.account
  console.log(params)
  connection.query('select * from user where account=? ', params, function (err, result) {
    if (err) {
      console.log(err)
      return
    }
    res.send({
      status: 1,
      data: result
    })
  })
})
app.post('/api/addactivity', (req, res) => {
  console.log(req.body)
  const params = Object.values(req.body)
  connection.query('insert into activity(activity_name,issuer_name,max_number,activity_range,activity_date,activity_kind,activity_des) values(?,?,?,?,?,?,?)', params, function (err, result) {
    if (err) {
      console.log(err)
      res.send({
        status: 0
      })
      return
    }
    res.send({
      'status': 1
    })
  })
})
app.post('/api/adduser', (req, res) => {
  console.log(req.body)
  const params = Object.values(req.body)
  connection.query('insert into user(account,password,type) values(?,?,?)', params, function (err, result) {
    if (err) {
      console.log(err)
      res.send({
        status: 0
      })
      return
    }
    res.send({
      'status': 1
    })
  })
})
app.post('/api/edituser', (req, res) => {
  console.log(req.body)
  const params = Object.values(req.body)
  console.log(params)
  connection.query('update user set account=?,password=?,type=? where id=?', params, function (err, result) {
    if (err) {
      console.log(err)
      res.send({
        status: 0
      })
      return
    }
    res.send({
      'status': 1
    })
  })
})
app.get('/api/deluser', (req, res) => {
  const params = req.query.id
  console.log(params)
  connection.query('delete from user where id=? ', params, function (err, result) {
    if (err) {
      console.log(err)
      return
    }
    res.send({
      'status': 1
    })
  })
})
app.post('/api/login', (req, res) => {
  const params = req.body
  console.log(params)
  connection.query('Select * from user where account=?', params.account, function (err, result) {
    if (err) {
      console.log(err)
      return
    }
    if (result[0] === undefined) {
      res.send({
        'status': -1
      })
    } else if (result[0]) {
      if (params.password === result[0].password) {
        res.send({
          'status': 1
        })
      } else {
        res.send({
          'status': 0
        })
      }
    }
  })
})
app.listen(8082, function () {
  console.log('CORS-enabled web server listening on port 8082')
})
