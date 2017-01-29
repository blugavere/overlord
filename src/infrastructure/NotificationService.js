'use strict';

const amqp = require('amqplib');
const uuid = require('node-uuid');

class NotificationService {
  static get inject() {
    return [];
  }
  constructor() {
    const self = this;
    self.idToCallbackMap = {};

    amqp.connect('amqp://localhost')
      .then(conn => {
        self.connection = conn;
        return conn.createChannel();
      })
      .then(ch => {
        self.channel = ch;
      })
      .catch(err => console.log(err));

      this.notify = this.notify.bind(this);
      this.request = this.request.bind(this);
  }
  notify(queue, msg, cb) {
    const self = this;
    self.channel.sendToQueue(queue, new Buffer(JSON.stringify(msg)));
    cb && cb();
  }
  request(queue, msg, cb){
    const id = uuid.v4();
    this.idToCallbackMap[id] = cb;
    this.channel.sendToQueue(queue, new Buffer(JSON.stringify(msg)), {
      correlationId: id,  replyTo: this.replyQueue
    });
  }
  listenForResponses(){
    const self = this;
    this.channel.consume(self.replyQueue, msg => {
      const correlationId = msg.properties.correlationId;
      const handler = self.idToCallbackMap[correlationId];
      if(handler) {
        handler(JSON.parse(msg.content.toString()));
      }
    });
  }
  handleRequest(handler) {
    const self = this;
    self.channel.consume(self.queue, msg => {
      const content = JSON.parse(msg.content.toString());
      handler(content, reply => { 
        self.channel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(reply)), {
          correlationId: msg.properties.correlationId
        });
        self.channel.ack(msg);
      });
    });
  }
}


module.exports = NotificationService;




      // self.channel.on('message', msg => {
      //   const handler = self.idToCallbackMap[msg.inReplyTo];
      //   console.log('Response Received');
      //   if(handler) {
      //     console.log('Executing Handler');
      //     handler(msg.data);
      //   }
      // });
      // // self.channel.assertQueue('', { exclusive: true});

