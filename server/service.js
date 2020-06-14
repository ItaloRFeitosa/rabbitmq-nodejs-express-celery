const amqp = require('amqplib/callback_api');
const uuid = require('uuid');
const EventEmitter = require('events');

const CONN_URL = 'amqp://service_user:service_user@localhost/service_vhost';

const REPLY_QUEUE = 'amq.rabbitmq.reply-to';

let ch = null;

amqp.connect(CONN_URL, (err,conn) => {

   conn.createChannel( (err, channel) => {
      channel.responseEmitter = new EventEmitter();
      channel.responseEmitter.setMaxListeners(0);
      channel.consume(
         REPLY_QUEUE,
         msg => {
            channel.responseEmitter.emit(
               msg.properties.correlationId,
               msg.content.toString('utf8'),
            ); 
         },
         { noAck: true },
      );
      ch = channel;
   })
})

module.exports = {
   sendRPCMessage: (message, rpcQueue) =>
      {
         const correlationId = uuid.v4();

         ch.responseEmitter.once(correlationId, (data) => {
            // Do Something when task is done
            console.log(data)
         });

         ch.sendToQueue(rpcQueue, Buffer.from(message), {
            correlationId,
            contentType : 'application/json',
            replyTo: REPLY_QUEUE,
         });
      }
}