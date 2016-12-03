'use strict';

const express = require('express');
const app = express();
const axios = require('axios');
const url = process.env.NODE_ENV === 'docker' ? 'http://other:3001/' : 'http://localhost:3001/';
const name = 'Zergling Service';
app.get('/', (req, res) => {
    console.log(`${name} Route Hit!`);
    axios.get(url).then(() => {
        console.log(`Hydralisk Service responded to ${name}`);
        res.send(`Hello World! - ${name}`);
    }, err => {
        console.log('ajax error', err);
    });
});

app.listen(3000, function () {
    console.log(`${name} listening on port 3000!`);
});