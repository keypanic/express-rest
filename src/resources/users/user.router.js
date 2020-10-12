const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validation');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route('/:userId').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.userId);
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    res.status(401).json(err.message);
  }
});

// TODO add validation
router.route('/').post(async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    const newUser = await usersService.createUser(user);
    res.status(200).json(User.toResponse(newUser));
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// // UPDATE
router.route('/:userId').put(async (req, res) => {
  const user = new User({
    id: req.params.userId,
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  if (validateUser.isEmptyOrNull(user)) {
    res.status(401).json('Access token is missing or invalid');
  } else {
    try {
      const updatedUser = await usersService.updateUser(user);
      res.status(200).json(User.toResponse(updatedUser));
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
});

// DELETE
router.route('/:userId').delete(async (req, res) => {
  try {
    const user = await usersService.deleteById(req.params.userId);
    if (!req.params.userId) {
      res.status(401).json('Access token is missing or invalid');
    } else {
      res.status(204).json(User.toResponse(user));
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
});

module.exports = router;
