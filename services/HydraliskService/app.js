
'use strict';

var express = require('express');
var app = express();

const name = 'Hydralisk Service';

app.get('/', function (req, res) {
  console.log(`${name} Route Hit!`);
  res.send(`Hello World! - ${name}`);
});

app.listen(3001, function () {
  console.log(`${name} listening on port 3001!`);
});
