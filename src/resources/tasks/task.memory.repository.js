const db = require('./../../common/database');
const NAME = db.tableNames.Tasks;

const getAll = async boardId => {
  return db.getAllBoardTasks(boardId);
};

const getById = async (boardId, taskId) => {
  const item = db.getTaskById(boardId, taskId);
  if (item) return item;
  throw Error(`Task not found: ${taskId}`);
};

const createTask = async task => {
  return db.createItem(NAME, task);
};

const updateTask = async task => {
  const updatedBoard = db.updateItem(NAME, task);
  return updatedBoard;
};

const deleteById = async taskId => {
  const task = db.deleteById(NAME, taskId);
  return task;
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteById
};
