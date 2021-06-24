const express = require('express');
const path = require('path');
const helmet = require('helmet');
const socketio = require('socket.io');
const { createServer } = require('http');
require('dotenv').config();

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

io.on('connection', (client) => {
  client.emit('hello', 'Hello there!');
});

server.listen(process.env.PORT, () =>
  console.log(`App is running on http://${process.env.HOST}:${process.env.PORT}`)
);
