const Cell = require('./cell');

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
          const isAlive = Math.random() < 0.5;
          this.cells[row][col] = new Cell(row, col, isAlive);
        } else {
          this.cells[row][col] = new Cell(row, col);
        }
      }
    }
  }

  isNeighbourAlive(row, col) {
    if (!this.cells[row] || !this.cells[col]) {
      return false;
    }

    const cell = this.cells[row][col];

    return cell && cell.isAlive;
  }

  countNeighbors(cell) {
    const { row, col } = cell;
    let count = 0;
    if (this.isNeighbourAlive(row - 1, col - 1)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row - 1, col)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row - 1, col + 1)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row, col + 1)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row + 1, col + 1)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row + 1, col)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row + 1, col - 1)) {
      count += 1;
    }
    if (this.isNeighbourAlive(row, col - 1)) {
      count += 1;
    }

    return count;
  }

  compute() {
    const nextGrid = new Grid(this.size);

    for (let row = 0; row < nextGrid.size; row += 1) {
      for (let col = 0; col < nextGrid.size; col += 1) {
        const cell = this.cells[row][col];
        const nextCell = nextGrid.cells[row][col];
        const numNeighbors = this.countNeighbors(cell);

        if (cell.isAlive) {
          if (numNeighbors < 2) {
            nextCell.die();
          } else if (numNeighbors === 2 || numNeighbors === 3) {
            nextCell.live();
          } else if (numNeighbors > 3) {
            nextCell.die();
          }
        } else {
          if (numNeighbors === 3) { // eslint-disable-line
            nextCell.live();
          }
        }
      }
    }
    this.cells = nextGrid.cells;
    return this;
  }

  render() {
    let output = '                       < GAME of LIFE >\n';

    for (let row = 0; row < this.size; row += 1) {
      for (let col = 0; col < this.size; col += 1) {
        const cell = this.cells[row][col];

        if (cell.isAlive) {
          output = `${output} ○ `;
        } else {
          output = `${output}   `;
        }

        if (cell.col === this.size - 1) {
          output = `${output}\r\n`;
        }
      }
    }
    return output;
  }
}

module.exports = Grid;
