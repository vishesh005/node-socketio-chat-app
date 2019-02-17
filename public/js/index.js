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

  socket.on('newLocationMessage',function(loc) {
     var li =jQuery('<li></li>');
     var a=jQuery('<a target="_blank">My Current loc</a>');
     li.text(`${loc.from} :`);
     a.attr('href',loc.url);
     li.append(a);
     jQuery('#messages').append(li);
  })
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

var locationButton=jQuery('#send-geolocation');
locationButton.on('click',function(position) {
  if(!navigator.geolocation)
   return alert('Your browser doesn\'t geo location');

   navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      socket.emit('createLocationMessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      });
   },
 function functionName() {
   alert('unable to fetch location');
 });
});
