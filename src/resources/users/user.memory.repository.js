const db = require('./../../common/database');
const NAME = db.tableNames.Users;

const getAll = async () => {
  return await db.getAll(NAME);
};

const getById = async userId => {
  const item = await db.getById(NAME, userId);
  if (item) return item;
  throw Error(`Not found: ${userId}`);
};

const createUser = async user => {
  return await db.createItem(NAME, user);
};

const updateUser = async user => {
  const updatedBoard = await db.updateItem(NAME, user);
  return updatedBoard;
};

// return deleted user or false if user not found
const deleteById = async userId => {
  const user = await db.deleteById(NAME, userId);
  return user;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteById
};
