const { NotFoundError, ForbiddenError } = require('../../util/error/errors');
const { userModel } = require('../../common/mongoDB');

// const login = async (login, password) => {
//   // hash pasword
//   // return await userModel
// };

const isLoginExists = async login => {
  return await userModel.exists({ login });
};

const getUserByLogin = async login => {
  return await userModel
    .findOne({ login })
    .orFail(new ForbiddenError('user not found'));
};

const getAll = async () => {
  return await userModel.find();
};

const getById = async userId => {
  return await userModel
    .findOne({ _id: userId })
    .orFail(new NotFoundError('user not found'));
};

const createUser = async user => {
  return await userModel.create(user);
};

const updateUser = async user => {
  return await userModel.findByIdAndUpdate({ _id: user._id }, user);
};

const deleteById = async userId => {
  return await userModel.findOneAndDelete({ _id: userId });
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteById,
  getUserByLogin,
  isLoginExists
};
