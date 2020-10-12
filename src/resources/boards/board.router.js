const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardsService.getById(req.params.boardId);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = new Board({
      title: req.body.title,
      columns: req.body.columns
    });
    const board = await boardsService.createBoard(newBoard);
    console.log(`create board: ${board.id}`);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const newBoard = new Board({
      id: req.params.boardId,
      title: req.body.title,
      columns: req.body.columns
    });
    const board = await boardsService.updateBoard(newBoard);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    console.log(`delete: ${req.params.boardId}`);
    const board = await boardsService.deleteById(req.params.boardId);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    res.status(404).json(err.message);
  }
});

module.exports = router;
