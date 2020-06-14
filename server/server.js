const express = require('express');
const app = express();
const {createTaskMessage} = require('./taskMessage')
const {sendRPCMessage} = require('./service');

//const CONN_URL = 'amqp://service_user:service_user@localhost/service_vhost';

app.use(express.json());

app.get("/", async (req,res) => {
    
    const task = createTaskMessage('hello')
    const response =  sendRPCMessage(JSON.stringify(task), 'celery');
    console.log(response);
    return res.json({task_id: task.id})

});

app.listen(3333);