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
  socket.on('keydown', (key) => {
    const isValidPlayer = state.validatePlayer(socket.id);
    if (!isValidPlayer) return;

    const gameCode = state.players[socket.id];
    const isValidGame = state.validateCode(gameCode);
    if (!isValidGame) return;

    const game = state.games[gameCode];
    if (!game.started) return;

    const player = game.players.find(({ id }) => id === socket.id);
    player.updateVel(key);
  });

  socket.on('create-game', (data) => {
    if (!data) return;

    const {
      gameSettings: { snakeSize, snakeSpeed, players },
      player: { name, color },
    } = data;

    const gameCode = Game.generateCode();
    const convertedSize = Game.convertSize(Number(snakeSize));
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

    socket.emit('joined-game', {
      game: { gameCode, numOfPlayers: Number(players), players: [player] },
      playerId: socket.id,
    });
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

    const { numOfPlayers, players } = game;

    socket.join(gameCode);
    socket.emit('joined-game', {
      game: { gameCode, numOfPlayers, players: players.map(({ id }) => id) },
      playerId: socket.id,
    });
    socket.to(gameCode).emit('new-player', player);

    if (game.started) {
      game.food.generateFood(
        game.size,
        game.players.map(({ snake }) => snake)
      );

      let count = 10;
      const interval = setInterval(() => {
        count--;

        if (count >= 0) {
          io.to(gameCode).emit('start-counter', count);
        } else {
          clearInterval(interval);
          io.to(gameCode).emit('game-start');
          const gameInterval = setInterval(() => {
            const winner = game.gameLoop();

            if (game.finished) {
              clearInterval(gameInterval);

              io.to(gameCode).emit('game-finished', winner);
            } else {
              io.to(gameCode).emit('game-loop', game);
            }
          }, 1000 / game.speed);
        }
      }, 1000);
    }
  });

  socket.on('disconnect', () => {
    state.removePlayer(socket.id);
    console.log(state);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`App is running on http://${process.env.HOST}:${process.env.PORT}`)
);
