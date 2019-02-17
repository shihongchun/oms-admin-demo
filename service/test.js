var express = require('express')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')

var app = express()
// var router = express.Router()

// 注册users接口
// var users = require('./routes/users')
// app.use('/users', users)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 访问静态资源
// app.use(express.static(path.resolve(__dirname, '../dist')))

// 访问单页
// app.get('*', function (req, res) {
//   var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
// })
app.post('/api/login', (req, res) => {
  console.log(req)
  console.log(111)
})
// 监听
app.listen(8082, function () {
  console.log('success listen...8081')
})
