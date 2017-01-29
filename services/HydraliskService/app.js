
  'use strict';

const express = require('express');
const app = express();
const axios = require('axios');
const NotificationService = require('../../src/infrastructure/NotificationService');

const url = process.env.NODE_ENV === 'docker' ? 'http://dockerhost:3002/' : 'http://localhost:3002/';
const name = 'Hydralisk Service';
const port = process.env.PORT || 3001;
const notificationService = new NotificationService();

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

app.post('/spawn/:id', (req, res) => {
  console.log(`${name} Spawn Route Hit!`);
  const id = req.params.id;
  notificationService.notify('broodling_queue', { name: `#1 - ${id}` });
  notificationService.notify('broodling_queue', { name: `#2 - ${id}` }, err => {
      if(err) {
        res.status(400);
        return res.send({ message: 'failed to spawn broodlings' });
      }
      res.send({ message: 'Request to spawn received' });
  });
});

app.post('/create/:id', (req, res) => {
  console.log(`${name} Create Route Hit!`);
  const id = req.params.id;
  notificationService.request('broodling_rpc', { name: `#1 - ${id}` }, (err, doc) => {
      if(err) {
        console.log(err);
        res.status(400);
        return res.send({ message: 'failed to create broodlings' });
      }
      res.send(doc);
  });
});

app.listen(port, function () {
  console.log(`${name} listening on port ${port}!`);
});
