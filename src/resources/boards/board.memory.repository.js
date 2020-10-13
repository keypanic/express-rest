const db = require('./../../common/database');
const NAME = db.tableNames.Boards;

const getAll = async () => {
  return await db.getAll(NAME);
};

const getById = async boardId => {
  const item = await db.getById(NAME, boardId);
  if (item) return item;
  throw Error(`Board not found: ${boardId}`);
};

const createBoard = async board => {
  return await db.createItem(NAME, board);
};

// TODO PUT
const updateBoard = async board => {
  const updatedBoard = await db.updateItem(NAME, board);
  return updatedBoard;
};

// return deleted user or false if user not found
const deleteById = async boardId => {
  const board = await db.deleteById(NAME, boardId);
  // console.log('deleted');
  // console.log(board);
  return board;
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteById
};
