const path = require('path');
const winston = require('winston');
const morgan = require('morgan');

const options = {
  file_info: {
    level: 'info',
    filename: path.join(__dirname, '../logs/app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file_info),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: message => {
    logger.info(message);
  }
};

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
morgan.token('params', (req, res) => {
  return JSON.stringify(req.params);
});

module.exports = {
  logger,
  morgan
};
