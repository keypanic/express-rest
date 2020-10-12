const User = require('../resources/users/user.model');
const DATABASE = {
  USERS: users,
  BOARDS: boards,
  COLUMNS: columns,
  TASKS: tasks
};
// id, title, order, description, userId, /*assignee*/ boardId, columnId
const tasks = [];

// set of columns
// id, title, columns
const boards = [];

// set of tasks
// id, title, order
const columns = [];

// id, name, login, password
const users = [
  userTemplate('user1', 'login1', 'password1'),
  userTemplate('user2', 'login2', 'password2'),
  userTemplate('user3', 'login3', 'password3')
];

function userTemplate(userId, userName, userLogin, userPassword) {
  return new User({
    id: userId,
    name: userName,
    login: userLogin,
    password: userPassword
  });
}

function initDB() {}

module.exports = {
  DATABASE
};
