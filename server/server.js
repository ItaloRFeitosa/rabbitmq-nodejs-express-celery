const express = require('express');

const app = express();

const server = require('http').createServer(app);

const io = require("socket.io")(server);

const {createTaskMessage} = require('./taskMessage')
const {sendRPCMessage} = require('./service');
//const CONN_URL = 'amqp://service_user:service_user@localhost/service_vhost';

app.use(express.json());

app.get("/:socket_id", async (req,res) => {
    const {socket_id} = req.params;
    const task = createTaskMessage('hello')
    const response =  sendRPCMessage(
        JSON.stringify(task), 
        'celery',
        (data) => io.to(socket_id).emit('task.done', data) 
    );
    //console.log(response);
    return res.json({task_id: task.id})

});

io.on('connection', socket => {
    console.log("[Socket] Connected: ", socket.id);

    socket.on('task.create', () => {
      const task = createTaskMessage('hello')
      const response =  sendRPCMessage(
        JSON.stringify(task), 
        'celery',
        (data) => socket.emit('task.done', data) 
      );
      console.log("[Socket] Task Created by: ", socket.id);
    })

    socket.on('disconnect', () => {
      console.log("[Socket] Disconnected: ", socket.id);
    })

});

server.listen(3333);