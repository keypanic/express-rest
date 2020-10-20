const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const { NotFoundError } = require('../util/error/errors');

const tableNames = {
  Users: 'USERS',
  Boards: 'BOARDS',
  Tasks: 'TASKS'
};

// id, title, order, description, userId, /*assignee*/ boardId, columnId
const tasks = [
  taskTemplate(
    'task1_user1',
    0,
    'task1_description board 1',
    'some stuff',
    '1',
    '1'
  ),
  taskTemplate(
    'task2_user1',
    0,
    'task2_description board 2',
    'some stuff',
    '1',
    '2'
  ),
  taskTemplate(
    'task3_user2',
    0,
    'task3_description board 2',
    'some stuff',
    '2',
    '2'
  ),
  taskTemplate(
    'task4_user3',
    0,
    'task4_description board 3',
    'some stuff',
    '3',
    '3'
  ),
  taskTemplate(
    'task5_user3',
    0,
    'task5_description board 1',
    'some stuff',
    '3',
    '1'
  )
];

// id, name, login, password
const users = [
  userTemplate('1', 'user1', 'login1', 'password1'),
  userTemplate('2', 'user2', 'login2', 'password2'),
  userTemplate('3', 'user3', 'login3', 'password3')
];

// set of columns
// id, title, columns
const boards = [
  boardsTemplate('1', 'board1', 'columns1'),
  boardsTemplate('2', 'board2', 'columns2'),
  boardsTemplate('3', 'board3', 'columns3')
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
  let itemO = deleteById(tableName, item.id, false);
  itemO = Object.assign(item);
  return createItem(tableName, itemO);
}

function deleteById(tableName, itemId, deleteTasks = true) {
  const itemIndex = getItemIndex(tableName, itemId);
  if (itemIndex < 0) {
    throw Error(`No ${tableName} find for deletion with id: ${itemId}`);
  }
  if (tableName === tableNames.Boards) {
    if (deleteTasks) {
      const tmpArray = data[tableNames.Tasks].filter(
        item => item.boardId !== itemId
      );
      data[tableNames.Tasks] = tmpArray;
    }
    return data[tableName].splice(itemIndex, 1)[0];
  } else if (tableName === tableNames.Users) {
    if (deleteTasks) {
      data[tableNames.Tasks].forEach((el, i, array) => {
        if (el.userId === itemId) array[i].userId = null;
      });
    }
    return data[tableName].splice(itemIndex, 1)[0];
  }
  throw Error('Unknow tableName for delete');
}

function deleteTask(boardId, taskId) {
  const taskIndex = getItemIndex(tableNames.Tasks, taskId);
  if (taskIndex < 0) {
    throw Error(`No ${taskIndex} find for deletion.`);
  }
  if (data[tableNames.Tasks][taskIndex].boardId !== boardId) {
    throw new NotFoundError(
      `Delete task error. Boards does not match ${boardId}`
    );
  }
  return data[tableNames.Tasks].splice(taskIndex, 1)[0];
}

function getAllBoardTasks(boardId) {
  return data[tableNames.Tasks].filter(el => el.boardId === boardId);
}

function getTaskById(boardId, taskId) {
  const tmp = data[tableNames.Tasks].find(
    el => el.id === taskId && el.boardId === boardId
  );
  if (tmp) return tmp;
  throw new NotFoundError(`No task with ${boardId} and ${taskId}`);
}

function updateTask(task) {
  let taskO = deleteTask(task.boardId, task.id);
  taskO = Object.assign(task);
  return createItem(tableNames.Tasks, taskO);
}

function getItemIndex(tableName, itemId) {
  if (!data[tableName].length) throw Error(`Database ${tableName} is empty`);
  return data[tableName].findIndex(item => {
    return item.id === itemId;
  });
}

function taskTemplate(
  taskId,
  taskTitle,
  taskOrder,
  taskDescription,
  taskUserId,
  taskBoardId,
  taskColumnId
) {
  return new Task({
    id: taskId,
    title: taskOrder,
    order: taskOrder,
    description: taskDescription,
    userId: taskUserId,
    boardId: taskBoardId,
    columnId: taskColumnId
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

module.exports = {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteById,
  getAllBoardTasks,
  getTaskById,
  updateTask,
  deleteTask,
  tableNames,
  users
};
