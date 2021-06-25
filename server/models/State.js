class State {
  constructor() {
    this.games = {};
    this.players = {};
  }

  validateCode = (gameCode) => {
    return gameCode in this.games;
  };

  validatePlayer = (playerId) => {
    return playerId in this.players;
  };

  addGame = (game) => {
    this.games[game.gameCode] = game;
  };

  removeGame(gameCode) {
    const gameExists = this.validateCode(gameCode);
    if (gameExists) return;

    delete this.games[gameCode];
  }

  addPlayer = (player, gameCode) => {
    const gameExists = this.validateCode(gameCode);
    if (!gameExists || this.games[gameCode].players.length === this.games[gameCode].numOfPlayers) {
      return;
    }

    this.players[player.id] = gameCode;
    this.games[gameCode].addPlayer(player);
  };

  removePlayer = (playerId) => {
    const playerExists = this.validatePlayer(playerId);
    if (!playerExists) return;

    const gameCode = this.players[playerId];
    const gameExists = this.validateCode(gameCode);
    if (!gameExists) return;

    if (this.games[gameCode].players.length <= 1) {
      delete this.games[gameCode];
    } else {
      this.games[gameCode].removePlayer(playerId);
    }

    delete this.players[playerId];
  };
}

module.exports = State;
