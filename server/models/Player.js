const ARROWS = require('../constants/arrows');

class Player {
  constructor({ id, name, color, position, snake }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.position = position;
    this.snake = snake;
    this.vel = {
      x: 0,
      y: 0,
    };
    this.isAlive = true;
  }

  _checkIsDead = (gridSize) => {
    return (
      this.position.x + this.vel.x > gridSize ||
      this.position.x + this.vel.x <= 0 ||
      this.position.y + this.vel.y >= gridSize ||
      this.position.y + this.vel.y <= 0
    );
  };

  updatePosition = (gridSize, food, snakes) => {
    if (this._checkIsDead(gridSize)) {
      this.isAlive = false;
      return;
    }

    this.position.x += this.vel.x;
    this.position.y += this.vel.y;

    this.snake.push({ ...this.position });

    const didEat = food.checkIsEaten(this.position);

    if (didEat) {
      food.generateFood(gridSize, snakes);
    } else {
      this.snake.shift();
    }
  };

  updateVel = (key) => {
    switch (key) {
      case ARROWS.UP:
        this.vel = { x: 0, y: -1 };
        break;
      case ARROWS.RIGHT:
        this.vel = { x: 1, y: 0 };
        break;
      case ARROWS.DOWN:
        this.vel = { x: 0, y: 1 };
        break;
      case ARROWS.LEFT:
        this.vel = { x: -1, y: 0 };
        break;
      default:
        return;
    }
  };

  static generateSnake(gridSize) {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    const position = {
      x,
      y,
    };

    const toLeft = gridSize / 2 <= x;
    const toTop = gridSize / 2 <= y;

    const snake = [
      {
        x: toLeft ? x - 2 : x + 2,
        y: toTop ? y - 2 : y + 2,
      },
      {
        x: toLefet ? x - 1 : x + 1,
        y: toLefet ? y - 1 : y + 1,
      },
      {
        ...position,
      },
    ];

    return { position, snake };
  }
}

module.exports = Player;
