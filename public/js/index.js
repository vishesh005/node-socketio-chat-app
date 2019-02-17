  var socket =io();
  socket.on('connect',function(){
    console.log('Connected to server');
  });
  socket.on('disconnect',function(){
    console.log('Disconnected from server');
  });
  socket.on('newMessage',function(message) {
    console.log(`New Email ${JSON.stringify(message)}`);
    var li=jQuery('<li></li>');
    li.text(` ${message.from} : ${message.text }`);
    jQuery('#messages').append(li);
  });
  socket.on('welcome',function(message) {
    console.log(message);
  });
  socket.on('joined',function(message) {
    console.log(message);
  });
  socket.emit('createMessage',{
    from:'YoyoBuddy',
    text:'Hey Server'
  },
  (response)=>{
    console.log('Got it ',response);
  });

jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
  socket.emit('createMessage',{
    name:'$Anonymous',
    text:jQuery('[name=message]').val()
  },
 function() {
   console.log('Message Received');
 });
});
