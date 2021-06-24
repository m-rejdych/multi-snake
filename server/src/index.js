const express = require('express');
const path = require('path');
const helmet = require('helmet');
const socketio = require('socket.io');
const { createServer } = require('http');

const { PORT, HOST } = require('./config');

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

server.listen(PORT, () => console.log(`App is running on http://${HOST}:${PORT}`));
