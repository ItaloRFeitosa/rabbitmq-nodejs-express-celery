const io = require("socket.io-client");

const axios = require('axios');

const socket = io('http://localhost:3333');

const socketId = `${socket.id}`;

socket.on('connect', (data)=>{
  console.log('[Socket] Connected \n');
    
  socket.on('teste', (data) => {
    console.log('[Socket] Data Received: \n', JSON.parse(data));
    
  })

  socket.on('task.done', (data) => {
    console.log('[Socket] Task Done: \n', JSON.parse(data));
    
  })

});



// setInterval(() => {
//     console.log('\n[Initiate Task...]');
//     axios.get(`http://localhost:3333/${socket.id}`)
//       .then(response  => console.log('[GET] Response data: \n',response.data));
//   } , 10000)

setInterval(() => {
    console.log('\n[Socket] Initiate Task');
    socket.emit('task.create')
  } , 20000)


