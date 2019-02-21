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
 const {Users} = require('./utils/users');
 var users=new Users();

 io.on('connection',(socket)=>{
  console.log('New User connected');

     // join room
      socket.on('join',(params,callback)=>{
             if(! isRealString(params.name) && !isRealString(params.room))
                return callback('Name and room is required');
               socket.join(params.room);
               users.removeUser(socket.id);
               users.addUser(socket.id,params.name,params.room);
               io.to(params.room).emit('updateUserList',users.getUserList(params.room));
               socket.emit('newMessage',generateMessage('Admin','Welcome user '+params.name));
               socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+' has joined'));
               callback();
      });
    //-------//
     socket.on('createMessage',(message,callback)=>{
        console.log(message);
        var user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
         }
        callback('Hey i am server i got your ,message');
     });

     socket.on('createLocationMessage',(coords)=>{
       var user=users.getUser(socket.id);
       if(user){
       io.emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
     }
     });
   socket.on('disconnect',()=>{
      var user=users.removeUser(socket.id);

      if(user){
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
      }
     console.log('Disconnected from client');
   });
  });

 server.listen(port,()=>{
   console.log(`Server is up and running on port ${port}`);
 });
