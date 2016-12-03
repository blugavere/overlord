var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3001, function () {
  console.log('Other app listening on port 3001!')
})