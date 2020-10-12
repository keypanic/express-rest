const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = boardId => boardsRepo.getById(boardId);

const createBoard = board => boardsRepo.createBoard(board);

const updateBoard = board => boardsRepo.updateBoard(board);

const deleteById = boardId => boardsRepo.deleteById(boardId);

module.exports = { getAll, getById, createBoard, updateBoard, deleteById };
