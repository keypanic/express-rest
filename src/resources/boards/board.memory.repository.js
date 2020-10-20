const db = require('./../../common/database');
const { NotFoundError } = require('../../util/error/errors');
const NAME = db.tableNames.Boards;

const getAll = async () => {
  return await db.getAll(NAME);
};

const getById = async boardId => {
  const item = await db.getById(NAME, boardId);
  if (item) return item;
  throw new NotFoundError(`Board not found: ${boardId}`);
};

const createBoard = async board => {
  return await db.createItem(NAME, board);
};

const updateBoard = async board => {
  const updatedBoard = await db.updateItem(NAME, board);
  return updatedBoard;
};

// return deleted user or false if user not found
const deleteById = async boardId => {
  const board = await db.deleteById(NAME, boardId);
  return board;
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteById
};
