require('./util/error/process_error');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/tasks.router');
const { logger, morgan } = require('./util/logger');
const errorFactory = require('./util/errorFactory');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

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

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardsRouter);

app.use('/boards/:boards/tasks', tasksRouter);

function errorHandler(error, req, res, next) {
  res
    .status(error.statusCode)
    .json(`${error.name} ${error.statusCode} ${error.message}`);
}
app.use(errorHandler);

module.exports = app;
