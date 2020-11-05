const userRepo = require('../users/user.repository');
const { ForbiddenError } = require('../../util/error/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const getUserByLogin = async (login, password) => {
  const user = await userRepo.getUserByLogin(login);
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { userId: user._id, login: user.login },
      JWT_SECRET_KEY,
      {
        expiresIn: '60s'
      }
    );
    return token;
  }
  throw new ForbiddenError(' bad credentials ');
};

module.exports = {
  getUserByLogin
};
