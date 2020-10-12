const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const createTask = task => tasksRepo.createTask(task);

const updateTask = task => tasksRepo.updateTask(task);

const deleteById = taskId => tasksRepo.deleteById(taskId);

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteById
};
