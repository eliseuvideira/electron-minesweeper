import Block from './Block';

class Board {
  constructor(rows, columns) {
    this.rows = new Map();
    for (let i = 1; i <= rows; i++) {
      this.rows.set(i, new Map());
      for (let j = 1; j <= columns; j++) {
        this.rows.get(i).set(
          j,
          new Block({
            board: this,
            row: i,
            column: j,
            open: false,
            flag: false,
            bomb: this._chanceBomb(),
            number: 0,
          }),
        );
      }
    }
    for (let row of this.rows.values()) {
      for (let block of row.values()) {
        block.calculate();
      }
    }
  }

  _chanceBomb() {
    if (Math.random() > 0.95) {
      return true;
    }
    return false;
  }
}

export default Board;
