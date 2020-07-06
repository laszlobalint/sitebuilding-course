const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the Socket.IO Server!' });
  socket.on('newMessageToServer', (newMessage) => {
    io.emit('messageToClients', { text: newMessage.text });
  });
});
