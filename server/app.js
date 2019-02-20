 const http = require('http');
 const express = require('express');
 const socketIO = require('socket.io');
 const app=express();
 const port=process.env.PORT || 3000;
 const path = require('path');
 const {generateMessage,generateLocationMessage} = require('./utils/message');
 var server=http.createServer(app);
 app.use(express.static(path.join(__dirname,'../public')));
 var io=socketIO(server);
 const {isRealString} = require('./utils/validation');

 io.on('connection',(socket)=>{
  console.log('New User connected');

     // join room
      socket.on('join',(params,callback)=>{
             if(! isRealString(params.name) && !isRealString(params.room))
               callback('Name and room is required');
               socket.join(params.room);
               socket.emit('newMessage',generateMessage('Admin','Welcome user '+params.name));
               socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+' has joined'));
               callback();
      });
    //-------//
     socket.on('createMessage',(message,callback)=>{
        console.log(message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('Hey i am server i got your ,message');
     });

     socket.on('createLocationMessage',(coords)=>{
       io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
     });
   socket.on('disconnect',()=>{
     console.log('Disconnected from client');
   });
  });

 server.listen(port,()=>{
   console.log(`Server is up and running on port ${port}`);
 });
