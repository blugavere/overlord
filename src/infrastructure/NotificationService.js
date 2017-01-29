'use strict';

const assert = require('assert');
const amqp = require('amqplib/callback_api');
const uuid = require('node-uuid');

class RabbitService {
  static get inject() {
    return [];
  }
  constructor() {
    const self = this;
    self.idToCallbackMap = {};

    this.init = this.init.bind(this);
    this.notify = this.notify.bind(this);
    this.request = this.request.bind(this);
  }

  init(cb) {
    const self = this;
    amqp.connect('amqp://localhost', (err, conn) => {
      if (err) return console.log(err);
      assert(!err, 'Failed to connect to Rabbit.');

      self.connection = conn;
      conn.createChannel((err, ch) => {
        if (err) return console.log(err);
        assert(!err, 'Failed to connect to channel.');
        self.channel = ch;

        // create instance specific queue to receive replies to RPC calls
        ch.assertQueue('', {
          exclusive: true
        }, (err, q) => {
          assert(!err, 'Failed to create private queue.');
          self.replyQueue = q.queue;

          ch.consume(q.queue, msg => {
            const correlationId = msg.properties.correlationId;
            const handler = self.idToCallbackMap[correlationId];
            const content = JSON.parse(msg.content.toString());
            console.log('Reply Receieved: ', JSON.stringify(content));
            if (handler) {
              handler(null, content);
            }
          }, {
            noAck: false
          });
          cb();
        });

      });
    });
  }

  /**
   * send one way message
   */
  notify(queue, msg, cb) {
    const self = this;
    this.channel.assertQueue(queue, {
      durable: true
    });
    self.channel.sendToQueue(queue, new Buffer(JSON.stringify(msg)), {
      persistent: true
    });
    cb && cb();
    console.log('Sent One-Way-Message: ', JSON.stringify(msg));
  }

  /**
   * send a request (response expected)
   */
  request(queue, msg, cb) {
    const self = this;
    const id = uuid.v4();
    this.idToCallbackMap[id] = cb;
    this.channel.assertQueue(queue, {
      durable: true
    });
    this.channel.sendToQueue(queue, new Buffer(JSON.stringify(msg)), {
      persistent: true,
      correlationId: id,
      replyTo: self.replyQueue
    });
    console.log('Sent Request: ', JSON.stringify(msg));
  }
}


module.exports = RabbitService;




// self.channel.on('message', msg => {
//   const handler = self.idToCallbackMap[msg.inReplyTo];
//   console.log('Response Received');
//   if(handler) {
//     console.log('Executing Handler');
//     handler(msg.data);
//   }
// });
// // self.channel.assertQueue('', { exclusive: true});


// amqp.connect('amqp://localhost')
//   .then(conn => {
//     self.connection = conn;
//     return conn.createChannel();
//   })
//   .then(ch => {
//     self.channel = ch;
//   })
//   .catch(err => console.log(err));

  // // not used
  // listenForResponses() {
  //   const self = this;
  //   this.channel.consume(self.replyQueue, msg => {
  //     const correlationId = msg.properties.correlationId;
  //     const handler = self.idToCallbackMap[correlationId];
  //     if (handler) {
  //       handler(JSON.parse(msg.content.toString()));
  //     }
  //   });
  // }
  // // not used
  // handleRequest(handler) {
  //   const self = this;
  //   self.channel.consume(self.queue, msg => {
  //     const content = JSON.parse(msg.content.toString());
  //     handler(content, reply => {
  //       self.channel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(reply)), {
  //         correlationId: msg.properties.correlationId
  //       });
  //       self.channel.ack(msg);
  //     });
  //   });
  // }