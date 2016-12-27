var blocksArray = [];
var express = require('express');
var socket = require('socket.io');


var app = express();
var server = app.listen(9876);

var io = socket(server);

io.sockets.on('connection', function(socket){
  // var sock = socket;
  // console.log('connected: ' + socket.id);
  io.to(socket.id).emit('addInitialBlocks', blocksArray);

  socket.on('addBlock', function(data) {
    blocksArray.push(data);
    socket.broadcast.emit('addBlock', data);
  });

  socket.on('disconnect', function() {
      socket.broadcast.emit('deletePlayer', socket.id);
  });

  socket.on('removeBlock', function(data){
    blocksArray.splice(data, 1);
    socket.broadcast.emit('removeBlock', data);
  });

  socket.on('clearDrawing', function(){
    blocksArray = [];
    socket.broadcast.emit('clearDrawing');
  })



  socket.on('recieveMouseLocation', function(data){
    sendInfo = {
      id: socket.id,
      x: data.mouseX,
      y: data.mouseY,
      name: data.name,
      col: data.col
    }

    socket.broadcast.emit('recieveMouseLocation', sendInfo);
  })

});
