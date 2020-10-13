const db = require('./../../common/database');
const NAME = db.tableNames.Tasks;

const getAll = async boardId => {
  return await db.getAllBoardTasks(boardId);
};

const getById = async (boardId, taskId) => {
  const item = await db.getTaskById(boardId, taskId);
  if (item) return item;
  throw Error(`Task not found: ${taskId}`);
};

const createTask = async task => {
  return await db.createItem(NAME, task);
};

const updateTask = async task => {
  const updatedBoard = await db.updateTask(task);
  return updatedBoard;
};

const deleteById = async (boardId, taskId) => {
  const task = await db.deleteTask(boardId, taskId);
  return task;
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteById
};
