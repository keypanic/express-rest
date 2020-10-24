const tasksRepo = require('./task.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const createTask = task => tasksRepo.createTask(task);

const updateTask = task => tasksRepo.updateTask(task);

const deleteById = (boardId, taskId) => tasksRepo.deleteById(boardId, taskId);

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteById
};
