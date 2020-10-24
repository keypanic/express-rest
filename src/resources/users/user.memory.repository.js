const { NotFoundError } = require('../../util/error/errors');
const { userModel } = require('../../common/mongoDB');

const getAll = async () => {
  return await userModel.find();
};

const getById = async userId => {
  return userModel
    .findOne({ id: userId })
    .orFail(new NotFoundError('user not found'));
};

const createUser = async user => {
  return await userModel.create(user);
};

// WHAT IF NOT FIND? CallbacK?
const updateUser = async user => {
  return await userModel.findOneAndUpdate({ id: user.id }, user);
};

// return deleted user or false if user not found
const deleteById = async userId => {
  return await userModel.findOneAndDelete({ id: userId });
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteById
};
