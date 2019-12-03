class Block {
  constructor({ board, row, column, open, flag, bomb, number }) {
    this.board = board;
    this.row = row;
    this.column = column;
    this.open = open;
    this.flag = flag;
    this.bomb = bomb;
    this.number = number;
  }

  getParallelBlocks() {
    const rows = this.board.rows;
    const blocks = [];
    for (let i = -1; i <= 1; i += 2) {
      const row = this.row + i;
      if (!rows.has(row)) {
        continue;
      }
      blocks.push(rows.get(row).get(this.column));
    }
    for (let j = -1; j <= 1; j += 2) {
      const column = this.column + j;
      if (!rows.get(this.row).has(column)) {
        continue;
      }
      blocks.push(rows.get(this.row).get(column));
    }
    return blocks;
  }

  getAdjacentBlocks() {
    const rows = this.board.rows;
    const blocks = [];
    for (let i = -1; i <= 1; i++) {
      const row = this.row + i;
      if (!rows.has(row)) {
        continue;
      }
      for (let j = -1; j <= 1; j++) {
        const column = this.column + j;
        if (!rows.get(row).has(column)) {
          continue;
        }
        blocks.push(rows.get(row).get(column));
      }
    }
    return blocks;
  }

  calculate() {
    if (this.bomb) {
      this.number = -1;
    } else {
      const blocks = this.getAdjacentBlocks();
      this.number = blocks.reduce((previous, current) => {
        if (!current.bomb) {
          return previous;
        }
        return previous + 1;
      }, 0);
    }
  }

  cascade() {
    const blocks = this.getParallelBlocks();
    blocks.forEach((block) => {
      if (!block.open) {
        block.toggleOpen();
      }
    });
  }

  toggleOpen() {
    if (this.flag) {
      return;
    }
    this.open = true;
    if (this.number === 0) {
      this.cascade();
    }
  }

  toggleFlag() {
    this.flag = !this.flag;
  }
}

export default Block;
