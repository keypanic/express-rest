const Board = require('./board.model');
const { v4: uuidv4 } = require('uuid');

const getAll = async () => {
  // users.forEach(user => console.log(user.id));
  // return users;
};

// userNotFound?
const getById = async boardId => {
  // return users.find(user => (user.id === userId ? user : false));
};

// validate? TODO POST
const createBoard = async board => {
  // return users[users.push(user) - 1];
};

// TODO PUT
const updateBoard = async board => {
  //   const usr = await deleteById(user.id);
  //   if (!usr) throw Error('no user found');
  //   usr.id = user.id;
  //   usr.name = user.name;
  //   usr.login = user.login;
  //   usr.password = user.password;
  //   return users[users.push(usr) - 1];
};

// return deleted user or false if user not found
const deleteById = async boardId => {
  //   const userIndex = getUserIndex(userId);
  //   if (userIndex < 0) return false;
  //   return users.splice(userIndex, 1)[0];
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteById
};
