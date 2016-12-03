
'use strict';

var express = require('express');
var app = express();
const axios = require('axios');
const url = process.env.NODE_ENV === 'docker' ? 'http://dockerhost:3002/' : 'http://localhost:3002/';
const name = 'Hydralisk Service';
const port = process.env.PORT || 3001;

app.get('/', function (req, res) {
  console.log(`${name} Route Hit!`);
  axios.get(url).then((result) => {
    console.log(result.data);
    res.send(`Hello World! - ${name}`);
  }, err => {
    console.log(err);
    res.send('Unable to access External API');
  });
});

app.listen(port, function () {
  console.log(`${name} listening on port ${port}!`);
});
