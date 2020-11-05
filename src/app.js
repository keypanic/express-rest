require('./util/error/process_error');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logger, morgan } = require('./util/logger');
const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/tasks.router');
const { authenticateToken } = require('./middleware/AuthToken');
const errorFactory = require('./util/errorFactory');

// handle error: /users/123/123
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// TODO LOGGER
app.use(
  morgan(':date[web], :method, :url, :status, body: :body,  params: :params', {
    stream: logger.stream
  })
);

function attachErrorFactory(req, res, next) {
  res.error = errorFactory(req, res, next);
  next();
}
app.use(attachErrorFactory);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middleware proxy all the requests (except /login) and check that HTTP Authorization header has the correct value of JWT token.
app.use('/', authenticateToken, (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// login route
app.use('/login', loginRouter);

// Require authentification
app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boards/:boardId/tasks', tasksRouter);

app.use('/*', (req, res) => {
  res.status(404).send('404 Page not found');
});

function errorHandler(error, req, res, next) {
  res
    .status(error.statusCode)
    .json(`${error.name} ${error.statusCode} ${error.message}`);
}
app.use(errorHandler);
module.exports = app;
