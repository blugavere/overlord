'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const name = 'Mutalisk Service';

app.get('/', (req, res) => {
    res.send({ data: 'Mutalisk Service!'});
});

app.listen(port, function () {
    console.log(`${name} listening on port ${port}!`);
});