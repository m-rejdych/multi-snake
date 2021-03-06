const Food = require('./Food');

class Game {
  constructor({ gameCode, numOfPlayers, size, speed, players = [] }) {
    this.gameCode = gameCode;
    this.numOfPlayers = numOfPlayers;
    this.size = size;
    this.speed = speed;
    this.players = players;
    this.started = false;
    this.finished = false;
    this.food = new Food();
    this.winner = null;
  }

  _checkIsFinished = () => {
    const alivePlayers = this.players.reduce((total, { isAlive }) => total + (isAlive ? 1 : 0), 0);

    return alivePlayers <= 1;
  };

  _getWinner = () => this.players.find(({ isAlive }) => isAlive)?.id;

  _checkCollision = () => {
    const alivePlayers = this.players.filter(({ isAlive }) => isAlive);
    const playersSnakes = alivePlayers.map(({ id, snake, position }) => [id, { snake, position }]);

    playersSnakes.forEach(([id, { position }]) => {
      const otherPlayers = playersSnakes.filter(([playerId]) => id !== playerId);

      if (
        otherPlayers.some(([_, { snake }]) =>
          snake.some(({ x, y }) => x === position.x && y === position.y)
        )
      ) {
        const player = this.players.find(({ id: playerId }) => playerId === id);
        player.isAlive = false;
      }
    });
  };

  addPlayer = (player) => {
    if (this.players.length === this.numOfPlayers || this.started) return false;

    this.players.push(player);

    if (this.players.length === this.numOfPlayers) {
      this.started = true;
    }

    return true;
  };

  removePlayer = (playerId) => {
    this.players = this.players.filter(({ id }) => id !== playerId);
  };

  gameLoop = () => {
    this.players
      .filter(({ isAlive }) => isAlive)
      .forEach((player) => {
        player.updatePosition(
          this.size,
          this.food,
          this.players.filter(({ isAlive }) => isAlive).map(({ snake }) => snake)
        );
      });

    this._checkCollision();

    const isFinished = this._checkIsFinished();

    if (isFinished) {
      this.finished = true;
      const winner = this._getWinner();
      this.winner = winner;
      return winner;
    }

    return null;
  };

  restart = () => {
    this.players.forEach((player) => {
      player.restart(this.size);
    });
    this.finished = false;
    this.winner = null;
    this.food.generateFood(
      this.size,
      this.players.map(({ snake }) => snake)
    );
    this.started = this.numOfPlayers === this.players.length;
  };

  static generateCode = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  static convertSize = (size) => {
    switch (size) {
      case 3:
        return 10;
      case 1:
        return 30;
      case 2:
      default:
        return 20;
    }
  };

  static convertSpeed = (speed) => {
    switch (speed) {
      case 1:
        return 5;
      case 3:
        return 20;
      case 2:
      default:
        return 10;
    }
  };
}

module.exports = Game;
