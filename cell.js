class Cell {
  constructor(row, col, alive = false) {
    this._row = row;
    this._col = col;
    this._alive = alive;
  }

  get row() {
    return this._row;
  }

  get col() {
    return this._col;
  }

  get isAlive() {
    return this._alive;
  }

  die() {
    this._alive = false;
  }

  live() {
    this._alive = true;
  }
}

module.exports = Cell;
