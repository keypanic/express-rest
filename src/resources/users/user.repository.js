const { NotFoundError } = require('../../util/error/errors');
const { userModel } = require('../../common/mongoDB');

const getAll = async () => {
  const usr = await userModel.find();
  console.log(usr);
  if (usr) console.log('IF TRUE');
  else console.log('ELSE FALSE');
  return usr;
};

const getById = async userId => {
  return userModel
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
  deleteById
};
