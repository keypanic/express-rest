const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  await boardsService
    .getAll()
    .then(boards => {
      res.json(boards.map(Board.toResponse));
    })
    .catch(res.error.factory);
});

router.route('/:boardId').get(async (req, res) => {
  await boardsService
    .getById(req.params.boardId)
    .then(board => res.json(Board.toResponse(board)))
    .catch(res.error.factory);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  await boardsService
    .createBoard(new Board({ title, columns }))
    .then(board => res.json(Board.toResponse(board)))
    .catch(res.error.factory);
});

router.route('/:boardId').put(async (req, res) => {
  const newBoard = new Board({
    id: req.params.boardId,
    title: req.body.title,
    columns: req.body.columns
  });
  await boardsService
    .updateBoard(newBoard)
    .then(board => res.json(Board.toResponse(board)))
    .catch(res.error.factory);
});

router.route('/:boardId').delete(async (req, res) => {
  await boardsService
    .deleteById(req.params.boardId)
    .then(board => res.json(Board.toResponse(board)))
    .catch(res.error.factory);
});

module.exports = router;
