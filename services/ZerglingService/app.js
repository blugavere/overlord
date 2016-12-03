var express = require('express')
var app = express()
const axios = require('axios');

const url = process.env.NODE_ENV === 'docker' ? 'http://other:3001/' : 'http://localhost:3001/';

app.get('/', function (req, res) {
    console.log('calling ajax response');
    axios.get(url).then(x => {
        console.log('ajax result successful!');
        console.log(x.data);
          res.send('Hello World!')
    }, err => {
        console.log('ajax error', err)
    });

})

app.listen(3000, function () {
  console.log('Demo app listening on port 3000!')
});