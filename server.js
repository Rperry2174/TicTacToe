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
    socket.emit('socketUpdateGameReducer', data);
    console.log("socketUpdateGameReducer: ", data)
  });

});

http.listen(3005, function(){
  console.log('listening on *:3005');
});
