const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boards);
    res.status(200).json(tasks.map(Task.toResponse));
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    // console.log(
    //   `create  task bodyId: ${req.body.boardId}, req.params.boards ${req.params.boards}`
    // );
    // if (req.body.boardId !== req.params.boards) throw Error("board id's error");
    const tmpTask = new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boards, // req.body.boardId,
      columnId: req.body.columnId
    });
    const newTask = await tasksService.createTask(tmpTask);
    res.status(200).json(Task.toResponse(newTask));
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.getById(
      req.params.boards,
      req.params.taskId
    );
    res.status(200).json(Task.toResponse(task));
  } catch (err) {
    res.status(401).json(err.message);
  }
});

module.exports = router;
