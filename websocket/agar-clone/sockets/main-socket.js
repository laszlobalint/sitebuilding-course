const io = require('../servers').io;
const PlayerConfiguration = require('./classes/PlayerConfiguration');
const PlayerPublicData = require('./classes/PlayerPublicData');
const Player = require('./classes/Player');
const Orb = require('./classes/Orb');

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

io.sockets.on('connection', (socket) => {
  socket.on('init', (data) => {
    let playerConfig = new PlayerConfiguration(settings);
    let playerData = new PlayerPublicData(data.playerName, settings);
    let player = new Player(socket.id, playerConfig, playerData);
    players.push(playerData);
    socket.emit('initReturn', {
      orbs,
    });
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
