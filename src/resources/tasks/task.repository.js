const { NotFoundError } = require('../../util/error/errors');
const { taskModel } = require('../../common/mongoDB');

const getAll = async boardId => {
  return await taskModel
    .find({ boardId })
    .orFail(new NotFoundError('board tasks not found'));
};

const getById = async (boardId, taskId) => {
  return await taskModel
    .findOne({ boardId, _id: taskId })
    .orFail(new NotFoundError('board tasks not found'));
};

const createTask = async task => {
  return await taskModel.create(task);
};

const updateTask = async task => {
  return await taskModel.findByIdAndUpdate(task._id, task);
};

const deleteById = async (boardId, taskId) => {
  return await taskModel.findOneAndDelete({ boardId, _id: taskId });
};

const deleteByBoardId = async boardId => {
  return await taskModel.deleteMany({ boardId });
};

const unassignUser = async userId => {
  return await taskModel.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteById,
  deleteByBoardId,
  unassignUser
};
