const User = require('./user.model');
const { v4: uuidv4 } = require('uuid');
const getAll = async () => {
  users.forEach(user => console.log(user.id));
  return users;
};

// userNotFound?
const getById = async userId => {
  return users.find(user => (user.id === userId ? user : false));
};

// validate? TODO POST
const createUser = async user => {
  return users[users.push(user) - 1];
};

// TODO PUT
const updateUser = async user => {
  const usr = await deleteById(user.id);
  if (!usr) throw Error('no user found');
  usr.id = user.id;
  usr.name = user.name;
  usr.login = user.login;
  usr.password = user.password;
  return users[users.push(usr) - 1];
};

// return deleted user or false if user not found
const deleteById = async userId => {
  const userIndex = getUserIndex(userId);
  if (userIndex < 0) return false;
  return users.splice(userIndex, 1)[0];
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

const users = [
  userTemplate(uuidv4(), 'user1', 'login1', 'password1'),
  userTemplate(uuidv4(), 'user2', 'login2', 'password2'),
  userTemplate(uuidv4(), 'user3', 'login3', 'password3') // ,
  // userTemplate(uuidv4(), 'user4', 'login4', 'password4'),
  // userTemplate(uuidv4(), 'user5', 'login5', 'password5'),
  // userTemplate(uuidv4(), 'user6', 'login6', 'password6'),
  // userTemplate(uuidv4(), 'user7', 'login7', 'password7'),
  // userTemplate(uuidv4(), 'user8', 'login8', 'password8'),
  // userTemplate(uuidv4(), 'user9', 'login9', 'password9'),
  // userTemplate(uuidv4(), 'user10', 'login10', 'password10'),
  // userTemplate(uuidv4(), 'user11', 'login11', 'password11')
];

// return -1 of not exist, or return user index
function getUserIndex(userId) {
  if (!users.length) return -1;
  return users.findIndex(user => {
    return user.id === userId;
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
