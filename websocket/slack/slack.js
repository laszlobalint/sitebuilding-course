const express = require('express');
const app = express();
const socketio = require('socket.io');
const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) => {
  const nsData = namespaces.map((ns) => {
    return {
      image: ns.image,
      endpoint: ns.endpoint,
    };
  });
  socket.emit('nsList', nsData);
});

namespaces.forEach((ns) => {
  io.of(ns.endpoint).on('connection', (nsSocket) => {
    nsSocket.emit('nsRoomLoad', namespaces[0].rooms);
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
      // Deal with history here
      nsSocket.join(roomToJoin);
      io.of('/wiki')
        .in(roomToJoin)
        .clients((error, clients) => {
          numberOfUsersCallback(clients.length);
        });
    });
    nsSocket.on('messageToServer', (msg) => {
      const fullMsg = {
        text: msg.text,
        time: new Date().toLocaleString(),
        username: 'laboabt',
        avatar: 'https://via.placeholder.com/30',
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      io.of('/wiki').to(roomTitle).emit('messageToClients', fullMsg);
    });
  });
});
