const express = require('express');
const socketio = require('socket.io');
const helmet = require('helmet');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(helmet());
const expressServer = app.listen(8080);
const io = socketio(expressServer);

module.exports = {
  app,
  io,
};
