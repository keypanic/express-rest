const { NotFoundError, BadRequestError } = require('../../util/error/errors');
const { boardModel } = require('../../common/mongoDB');

const getAll = async () => {
  return await boardModel.find().orFail(new NotFoundError(' not found '));
};

const getById = async boardId => {
  return boardModel
    .findById({ _id: boardId })
    .orFail(new NotFoundError('board not found'));
};

const createBoard = async board => {
  return await boardModel.create(board);
};

const updateBoard = async board => {
  return await boardModel
    .findByIdAndUpdate(board._id, board)
    .orFail(new BadRequestError(' update board fail '));
};

const deleteById = async boardId => {
  return await boardModel
    .findOneAndDelete({ _id: boardId })
    .orFail(new NotFoundError(' not found '));
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteById
};
