const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, WHITE_URL_LIST } = require('../common/config');

function authenticateToken(req, res, next) {
  if (WHITE_URL_LIST.includes(req.path)) return next();
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
};
