const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  await tasksService
    .getAll(req.params.boards)
    .then(tasks => {
      res.json(tasks.map(Task.toResponse));
    })
    .catch(res.error.factory);
});

router.route('/').post(async (req, res) => {
  const tmpTask = new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boards,
    columnId: req.body.columnId
  });
  await tasksService
    .createTask(tmpTask)
    .then(task => {
      res.json(Task.toResponse(task));
    })
    .catch(res.error.factory);
});

router.route('/:taskId').get(async (req, res) => {
  await tasksService
    .getById(req.params.boards, req.params.taskId)
    .then(task => {
      res.json(Task.toResponse(task));
    })
    .catch(res.error.factory);
});

router.route('/:taskId').put(async (req, res) => {
  const tmpTask = new Task({
    id: req.params.taskId,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boards,
    columnId: req.body.columnId
  });
  await tasksService
    .updateTask(new Task(tmpTask))
    .then(task => {
      res.json(Task.toResponse(task));
    })
    .catch(res.error.factory);
});

router.route('/:taskId').delete(async (req, res) => {
  await tasksService
    .deleteById(req.params.boards, req.params.taskId)
    .then(task => {
      res.json(Task.toResponse(task));
    })
    .catch(res.error.factory);
});

module.exports = router;
