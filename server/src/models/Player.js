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
      this.position.x >= gridSize ||
      this.position.x < 0 ||
      this.position.y >= gridSize ||
      this.position.y < 0 ||
      this.snake.slice(0, -1).some(({ x, y }) => x === this.position.x && y === this.position.y)
    );
  };

  updatePosition = (gridSize, food, snakes) => {
    if (this.vel.x === 0 && this.vel.y === 0) return;

    this.position.x += this.vel.x;
    this.position.y += this.vel.y;

    if (this._checkIsDead(gridSize)) {
      this.isAlive = false;
      return;
    }

    this.snake.push({ ...this.position });

    const didEat = food.checkIsEaten(this.position);

    if (didEat) {
      food.generateFood(gridSize, snakes);
    } else {
      this.snake.shift();
    }
  };

  updateVel = (key) => {
    const isStarting = this.vel.x === 0 && this.vel.y === 0;
    let possibleX;
    if (isStarting) {
      possibleX = this.snake[this.snake.length - 2].x > this.position.x ? -1 : 1;
    }

    switch (key) {
      case ARROWS.UP:
        this.vel = this.vel.y === 1 ? this.vel : { x: 0, y: -1 };
        break;
      case ARROWS.RIGHT:
        this.vel = this.vel.x === -1 || (isStarting && possibleX !== 1) ? this.vel : { x: 1, y: 0 };
        break;
      case ARROWS.DOWN:
        this.vel = this.vel.y === -1 ? this.vel : { x: 0, y: 1 };
        break;
      case ARROWS.LEFT:
        this.vel =
          this.vel.x === 1 || (isStarting && possibleX !== -1) ? this.vel : { x: -1, y: 0 };
        break;
      default:
        return;
    }
  };

  restart = (gridSize) => {
    const { position, snake } = this.constructor.generateSnake(gridSize);

    this.snake = snake;
    this.position = position;
    this.vel = { x: 0, y: 0 };
    this.isAlive = true;
  };

  static generateSnake(gridSize) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);

    const position = {
      x,
      y,
    };

    const toLeft = gridSize / 2 <= x;

    const snake = [
      {
        x: toLeft ? x - 2 : x + 2,
        y,
      },
      {
        x: toLeft ? x - 1 : x + 1,
        y,
      },
      {
        ...position,
      },
    ];

    return { position, snake };
  }
}

module.exports = Player;
