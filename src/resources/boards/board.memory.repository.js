const { NotFoundError } = require('../../util/error/errors');
const { boardModel } = require('../../common/mongoDB');

const getAll = async () => {
  return await boardModel.find();
};

const getById = async boardId => {
  return boardModel
    .findOne({ id: boardId })
    .orFail(new NotFoundError('board not found'));
};

const createBoard = async board => {
  return await boardModel.create(board);
};

const updateBoard = async board => {
  return await boardModel.findOneAndUpdate({ id: board.id }, board);
};

// return deleted user or false if user not found
const deleteById = async boardId => {
  return await boardModel
    .findOneAndDelete({ id: boardId })
    .orFail(new NotFoundError('Bad operation'));
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteById
};
