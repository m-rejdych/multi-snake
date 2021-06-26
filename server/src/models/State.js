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

  removeGame = (gameCode) => {
    const gameExists = this.validateCode(gameCode);
    if (!gameExists) return false;

    delete this.games[gameCode];

    return true;
  };

  addPlayer = (player, gameCode) => {
    const gameExists = this.validateCode(gameCode);
    if (
      !gameExists ||
      this.games[gameCode].players.length === this.games[gameCode].numOfPlayers ||
      this.games[gameCode].started
    ) {
      return false;
    }

    this.players[player.id] = gameCode;
    this.games[gameCode].addPlayer(player);

    return true;
  };

  removePlayer = (playerId) => {
    const playerExists = this.validatePlayer(playerId);
    if (!playerExists) return false;

    const gameCode = this.players[playerId];
    const gameExists = this.validateCode(gameCode);
    if (!gameExists) return false;

    if (this.games[gameCode].players.length <= 1) {
      this.removeGame(gameCode);
    } else {
      this.games[gameCode].removePlayer(playerId);
    }

    delete this.players[playerId];

    return true;
  };
}

module.exports = State;
