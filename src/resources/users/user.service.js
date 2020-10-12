const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = userId => usersRepo.getById(userId);

const createUser = (name, login, password) =>
  usersRepo.createUser(name, login, password);

const updateUser = user => usersRepo.updateUser(user);

const deleteById = userId => usersRepo.deleteById(userId);

module.exports = { getAll, getById, createUser, updateUser, deleteById };
