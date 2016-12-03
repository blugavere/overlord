'use strict';

const express = require('express');
const app = express();
const axios = require('axios');
const url = process.env.NODE_ENV === 'docker' ? 'http://hydralisk:3001/' : 'http://localhost:3001/';
const name = 'Zergling Service';
const port = process.env.PORT || 3000;

console.log(`Bootstrapping ${process.env.NODE_ENV}:`);
console.log('URL: ', url);

app.get('/', (req, res) => {
    console.log(`${name} Route Hit!`);
    axios.get(url).then(() => {
        console.log(`Hydralisk Service responded to ${name}`);
        res.send(`Hello World! - ${name}`);
    }, err => {
        console.log('ajax error', err);
        res.send('Hydralisk Service Error!');
    });
});

app.listen(port, function () {
    console.log(`${name} listening on port ${port}!`);
});