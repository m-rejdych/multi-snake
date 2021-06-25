const Food = require('./Food');

class Game {
  constructor({ gameCode, numOfPlayers, size, speed, creator }) {
    this.gameCode = gameCode;
    this.numOfPlayers = numOfPlayers;
    this.size = size;
    this.speed = speed;
    this.players = [creator];
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

  addPlayer = (player) => {
    if (this.players.length === this.numOfPlayers) return;

    this.players.push(player);
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
          this.players.map(({ snake }) => snake)
        );
      });

    const isFinished = this._checkIsFinished();

    if (isFinished) {
      this.finished = true;
      const winner = this._getWinner();
      this.winner = winner;
    }
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
      case 2:
        return 30;
      case 3:
        return 40;
      case 1:
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
