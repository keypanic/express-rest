const usersRepo = require('./user.repository');
const taskRepo = require('../tasks/task.repository');
const { BadRequestError } = require('../../util/error/errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = () => usersRepo.getAll();

const getById = userId => usersRepo.getById(userId);

const createUser = async user => {
  // check if user exists
  // if (await usersRepo.getUserByLogin(user.login)) {
  //   throw new BadRequestError(' login already exists ');
  // }
  user.password = bcrypt.hashSync(user.password, saltRounds);
  return usersRepo.createUser(user);
};

const updateUser = user => usersRepo.updateUser(user);

const deleteById = userId => {
  taskRepo.unassignUser(userId);
  return usersRepo.deleteById(userId);
};

module.exports = { getAll, getById, createUser, updateUser, deleteById };
