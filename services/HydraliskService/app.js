
'use strict';

var express = require('express')
var app = express()

const name = 'Hydralisk Service';

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3001, function () {
  console.log(`${name} listening on port 3001!`);
});
