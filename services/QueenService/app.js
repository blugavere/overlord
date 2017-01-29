


'use strict';

// node tools/libraries/RabbitMQ/worker

const amqp = require('amqplib');
const chalk = require('chalk');
const NotificationService = require('../../src/infrastructure/NotificationService');
const notificationService = new NotificationService();

let channel, queue;

const consume = () => {
  channel.consume(queue, e => {
    const msg = JSON.parse(e.content); // buffer

    console.log('Queen received', msg);
    console.log('Spawning broodlings...');
    channel.ack(e);

    setTimeout(() => {
      notificationService.notify('broodling_results', { _id: msg.name }, err => {
        console.log('Notified sender of new broodlings');
      });
    }, 3000);
  });
};

amqp.connect('amqp://localhost')
  .then(conn => {
    return conn.createChannel();
  })
  .then(ch => {
    channel = ch;
    return channel.assertQueue('broodling_queue');
  })
  .then(q => {
    q.queue;
    consume();
  })
  .catch(e => console.log(e));

console.log(chalk.bold(chalk.cyan('Queen listening...')));
