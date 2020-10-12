const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const tableNames = {
  Users: 'USERS',
  Boards: 'BOARDS',
  Tasks: 'TASKS'
};

// id, title, order, description, userId, /*assignee*/ boardId, columnId
const tasks = [];

// id, name, login, password
const users = [
  userTemplate('user1', 'login1', 'password1'),
  userTemplate('user2', 'login2', 'password2'),
  userTemplate('user3', 'login3', 'password3')
];

// set of columns
// id, title, columns
const boards = [
  boardsTemplate('board1', 'columns1'),
  boardsTemplate('board2', 'columns2'),
  boardsTemplate('board3', 'columns3')
];

function getAll(tableName) {
  return data[tableName];
}

function getById(tableName, itemId) {
  return data[tableName].find(el => el.id === itemId);
}

function createItem(tableName, item) {
  if (getById(tableName, item.id)) throw Error(`Item already exists: ${item}`);
  const index = data[tableName].push(item);
  return data[tableName][index - 1];
}

function updateItem(tableName, item) {
  let itemO = deleteById(tableName, item.id, true);
  itemO = Object.assign(item);
  return createItem(tableName, itemO);
}

function deleteById(tableName, itemId, update = false) {
  const itemIndex = getItemIndex(tableName, itemId);
  if (itemIndex < 0) {
    throw Error(`No ${tableName} find for deletion. ${itemId}`);
  }
  if (tableName === tableNames.Boards) {
    if (!update) {
      // удаляем tasks связанные по id
    }
    return data[tableName].splice(itemIndex, 1)[0];
  } else if (tableName === tableNames.Users) {
    if (!update) {
      // удаляем tasks связанные по id
    }
  } else if (tableName === tableNames.Tasks) {
  }
}

function getItemIndex(tableName, itemId) {
  if (!data[tableName].length) throw Error(`Database ${tableName} is empty`);
  return data[tableName].findIndex(item => {
    return item.id === itemId;
  });
}

function boardsTemplate(boardId, boardTitle, boardColumns) {
  return new Board({
    id: boardId,
    title: boardTitle,
    columns: boardColumns
  });
}

function userTemplate(userId, userName, userLogin, userPassword) {
  return new User({
    id: userId,
    name: userName,
    login: userLogin,
    password: userPassword
  });
}

const data = {
  USERS: users,
  BOARDS: boards,
  // COLUMNS: columns,          НЕ НУЖНЫ
  TASKS: tasks
};

// function initDB() {
//   boardName = "board";
//   for(let i = 1; i < 3; i++) {
//     boards.push(boardTemplate(boardName + i);
//   }
// }

module.exports = {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteById,
  tableNames,
  users
};
