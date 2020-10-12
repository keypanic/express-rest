const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validation');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  console.log(`getUser ${User.toResponse(user)}, byId ${req.params.userId}`);
  res.status(200);
  res.json(User.toResponse(user));
});

// TODO add validation
router.route('/').post(async (req, res) => {
  const user = new User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  const newUser = await usersService.createUser(user);
  res.status(200).json(User.toResponse(newUser));
});

// // UPDATE
router.route('/:userId').put(async (req, res) => {
  console.log('update user');
  const user = new User({
    id: req.params.userId,
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  // validateUser
  //   .isEmptyOrNullPromise(user)
  //   .catch(res.status(401).send('Access token is missing or invalid'));
  if (validateUser.isEmptyOrNull(user)) {
    res.status(401).json('Access token is missing or invalid');
  } else {
    const updatedUser = await usersService.updateUser(user);
    console.log(updatedUser);
    res.status(200).json(User.toResponse(updatedUser));
  }
});

// DELETE
router.route('/:userId').delete(async (req, res) => {
  console.log(`delete user: ${req.params.userId}`);
  const user = await usersService.deleteById(req.params.userId);
  if (!req.params.userId) {
    res.status(401).json('Access token is missing or invalid');
  } else if (user) {
    res.status(204).json(User.toResponse(user));
  } else {
    res.status(404).json('User not found');
  }
});

module.exports = router;
