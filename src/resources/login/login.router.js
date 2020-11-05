// router -> service ->
// запрос getUser
// getUser by login
// compare(req.params.password, user.password)
const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  await loginService
    .getUserByLogin(req.body.login, req.body.password)
    .then(token => {
      res.json({ token });
    })
    .catch(res.error.factory);
});
module.exports = router;
