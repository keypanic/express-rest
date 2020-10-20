const {
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR
} = require('../httpResponseCodes');

class HttpError extends Error {
  constructor({ message, name, statusCode, data }) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.data = data;
  }
}

class NotFoundError extends HttpError {
  constructor(message, query) {
    super(message);
    this.message = message;
    this.name = 'NOT_FOUND_ERROR';
    this.data = { message, query };
    this.statusCode = HTTP_NOT_FOUND;
  }
}
class InternalServerError extends HttpError {
  constructor(message, query) {
    super(message);
    this.message = message;
    this.name = 'INTERNAL_SERVER_ERROR';
    this.data = { message, query };
    this.statusCode = HTTP_INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  HttpError,
  NotFoundError,
  InternalServerError
};
