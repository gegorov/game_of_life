class Grid {
  constructor(size, randomize = false) {
    this.size = size;

    this.init(randomize);
  }

  init(randomize) {
    this.cells = new Array(this.size);

    for (let row = 0; row < this.size; row += 1) {
      this.cells[row] = new Array(this.size);

      for (let col = 0; col < this.size; col += 1) {
        if (randomize) {
          const isAlive = Math.random < 0.5;
          this.cells[row][col] = new Cell(row, col, isAlive);
        } else {
          this.cells[row][col] = new Cell(row, col);
        }
      }
    }
  }

  compute() {
    // TODO:
  }

  render() {
    // TODO:
  }
}

module.exports = Grid;
