var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/socketTest.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('socketUpdateGameReducer', function(data){
    io.sockets.in('room1').emit('socketUpdateGameReducer', data);
    console.log("socketUpdateGameReducer: ", data)
  });

  socket.on('create', function(room) {
    console.log("[SERVER] joining room: ", room)
    socket.join(room);
    io.sockets.in(room).emit('connectToRoom', "You are in room no. " + room);
  });

});

http.listen(3005, function(){
  console.log('listening on *:3005');
});
