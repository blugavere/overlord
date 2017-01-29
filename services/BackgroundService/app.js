
'use strict';

const amqp = require('amqplib');
const chalk = require('chalk');

let channel, queue;

amqp.connect('amqp://localhost')
  .then(conn => {
    return conn.createChannel();
  })
  .then(ch => {
    channel = ch;
    return channel.assertQueue('broodling_results');
  })
  .then(q => {
    queue = q.queue;
    channel.consume(queue, msg => {
      console.log(chalk.bold(`Message recieved by Background Server: ${msg.content.toString()}`));
    });
  })
  .catch(e => console.log(e));


console.log(chalk.bold(chalk.cyan('Background listening...')));