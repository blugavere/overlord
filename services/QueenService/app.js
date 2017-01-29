


'use strict';

// node tools/libraries/RabbitMQ/worker

const amqp = require('amqplib');
const chalk = require('chalk');
const NotificationService = require('../../src/infrastructure/NotificationService');
const notificationService = new NotificationService();

let channel, queue;

let counter = 0;
const broodlingFactory = {
  create(data, cb) {
    counter++;
    cb(null, {
      _id: counter,
      name: data.name,
      type: 'broodling'
    });
  }
};

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

  const rpcQueue = 'broodling_rpc';
  channel.assertQueue(rpcQueue, {durable: true});
  channel.consume(rpcQueue, msg => {
    const content = JSON.parse(msg.content.toString());
    broodlingFactory.create(content, (err, broodling) => { 
      if(err) {
        return console.error(err);
      }
      console.log('Props: ', msg.properties);
      channel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(broodling)), {
        correlationId: msg.properties.correlationId
      });
      channel.ack(msg);
    });
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
