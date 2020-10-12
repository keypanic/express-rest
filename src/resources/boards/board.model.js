const uuid = require('uuid');
class Board {
  constructor({ id = uuid(), title = 'title', columns = 'columns' } = {}) {
    this.id = id;
    this.title = title; // not null
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
