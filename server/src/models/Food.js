class Food {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  generateFood = (gridSize, snakes) => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);

    if (
      (x === this.x && y === this.y) ||
      snakes.some(({ x: snakeX, y: snakeY }) => x === snakeX && y === snakeY)
    ) {
      this.generateFood();
    } else {
      this.x = x;
      this.y = y;
    }
  };

  checkIsEaten = ({ x, y }) => this.x === x && this.y === y;
}

module.exports = Food;
