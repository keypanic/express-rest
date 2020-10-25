const uuid = require('uuid');
class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = 'order',
    description = 'description',
    userId = 'userid',
    boardId = 'boardId',
    columnId = 'columnId'
  } = {}) {
    this._id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
