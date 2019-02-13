 const http = require('http');
 const express = require('express');
 const socketIO = require('socket.io');
 const app=express();
 const port=process.env.PORT || 3000;
 const path = require('path');
 var server=http.createServer(app);
 app.use(express.static(path.join(__dirname,'../public')));
 var io=socketIO(server);
 io.on('connection',(socket)=>{
  console.log('New User connected');
  socket.emit('gotEmail',{
    from:'Vishesh',
    text:'Hey there how are you',
    sendAt:123
  });
   socket.on('disconnect',()=>{
     console.log('Disconnected from client');
   });
  });

 server.listen(port,()=>{
   console.log(`Server is up and running on port ${port}`);
 });
