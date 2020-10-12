const { users } = require('./../../common/userData');

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

// return -1 of not exist, or return user index
function getUserIndex(userId) {
  if (!users.length) return -1;
  return users.findIndex(user => {
    return user.id === userId;
  });
}
