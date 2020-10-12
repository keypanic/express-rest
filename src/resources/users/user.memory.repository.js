const db = require('./../../common/database');
const NAME = db.tableNames.Users;

const getAll = async () => {
  return db.getAll(NAME);
};

// userNotFound?
const getById = async userId => {
  const item = db.getById(NAME, userId);
  if (item) return item;
  throw Error(`Not found: ${userId}`);
};

// validate? TODO POST
const createUser = async user => {
  return db.createItem(NAME, user);
};

// TODO PUT
const updateUser = async user => {
  const updatedBoard = db.updateItem(NAME, user);
  return updatedBoard;
};

// return deleted user or false if user not found
const deleteById = async userId => {
  const user = db.deleteById(NAME, userId);
  // console.log('deleted');
  // console.log(board);
  return user;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteById
};

/*
 * `/users`
 * `GET /users` - get all users (remove password from response)
 * `GET /users/:id` - get the user by id (ex. “/users/123”) (remove password from response)
 * `POST /users` - create user
 * `PUT /users/:id` - update user
 * `DELETE /users/:id` - delete user
 */
