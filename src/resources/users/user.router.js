const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
router.route('/').get(async (req, res) => {
  await usersService
    .getAll()
    .then(users => {
      res.json(users.map(User.toResponse));
    })
    .catch(res.error.factory);
});

router.route('/:userId').get(async (req, res) => {
  await usersService
    .getById(req.params.userId)
    .then(user => res.json(User.toResponse(user)))
    .catch(res.error.factory);
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  await usersService
    .createUser(new User({ name, login, password }))
    .then(user => {
      res.json(User.toResponse(user));
    })
    .catch(res.error.factory);
});

// UPDATE
router.route('/:userId').put(async (req, res) => {
  const { id, name, login, password } = req.body;
  await usersService
    .updateUser(new User({ id, name, login, password }))
    .then(user => {
      res.json(User.toResponse(user));
    })
    .catch(res.error.factory);
});

// DELETE
router.route('/:userId').delete(async (req, res) => {
  await usersService
    .deleteById(req.params.userId)
    .then(user => res.status(204).json(User.toResponse(user)))
    .catch(res.error.factory);
});

module.exports = router;
