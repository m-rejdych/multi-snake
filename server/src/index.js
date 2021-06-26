const express = require('express');
const path = require('path');
const helmet = require('helmet');
const socketio = require('socket.io');
const { createServer } = require('http');
require('dotenv').config();

const State = require('./models/State');
const Game = require('./models/Game');
const Player = require('./models/Player');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
}

const server = createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const state = new State();

io.on('connection', (socket) => {
  socket.on('create-game', (data) => {
    if (!data) return;

    const {
      gameSettings: { boardSize, snakeSpeed, players },
      player: { name, color },
    } = data;

    const gameCode = Game.generateCode();
    const convertedSize = Game.convertSize(Number(boardSize));
    const convertedSpeed = Game.convertSpeed(Number(snakeSpeed));

    const { snake, position } = Player.generateSnake(convertedSize);
    const player = new Player({ id: socket.id, name, color, position, snake });

    const game = new Game({
      speed: convertedSpeed,
      size: convertedSize,
      numOfPlayers: Number(players),
      gameCode,
    });

    state.addGame(game);
    state.addPlayer(player, gameCode);

    socket.join(gameCode);

    socket.emit('joined-game', { game, playerId: socket.id });
  });

  socket.on('join-game', ({ gameCode, player: { name, color } }) => {
    const isValid = state.validateCode(gameCode);
    if (!isValid) {
      socket.emit('invalid-code');
      return;
    }

    const game = state.games[gameCode];

    const { position, snake } = Player.generateSnake(game.size);
    const player = new Player({ name, color, position, snake, id: socket.id });

    const joined = state.addPlayer(player, gameCode);

    if (!joined) {
      socket.emit('could-not-join');
      return;
    }

    socket.join(gameCode);
    socket.emit('joined-game', { game, playerId: socket.id });
    socket.to(gameCode).emit('new-player', player);
  });

  socket.on('disconnect', () => {
    state.removePlayer(socket.id);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`App is running on http://${process.env.HOST}:${process.env.PORT}`)
);
