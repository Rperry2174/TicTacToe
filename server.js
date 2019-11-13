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
    let { roomCode } = data;
    socket.join(roomCode);
    io.sockets.in(roomCode).emit('socketUpdateGameReducer', data);
    console.log("socketUpdateGameReducer: ", data)
  });

  socket.on('syncLobby', function(players) {
    console.log("[SERVER] syncLobby players: ", players)
    socket.join('lobby');
    io.sockets.in('lobby').emit('syncLobby', players);
  });

  socket.on('addPlayerToLobby', function(players) {
    console.log("[SERVER] addPlayerToLobby players: ", players)
    socket.join('lobby');
    io.sockets.in('lobby').emit('syncLobby', players);
    io.sockets.in('lobby').emit('addPlayerToLobby', players);
  });

  socket.on('editPlayerName', function(playerInfo) {
    socket.join('lobby');
    io.sockets.in('lobby').emit('editPlayerName', playerInfo);
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
