const {
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_FORBIDDEN_ERROR,
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
class BadRequestError extends HttpError {
  constructor(message, query) {
    super(message);
    this.message = message;
    this.name = 'Bad request';
    this.data = { message, query };
    this.statusCode = HTTP_BAD_REQUEST;
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
class ForbiddenError extends HttpError {
  constructor(message, query) {
    super(message);
    this.message = message;
    this.name = 'Forbidden';
    this.data = { message, query };
    this.statusCode = HTTP_FORBIDDEN_ERROR;
  }
}

module.exports = {
  BadRequestError,
  HttpError,
  NotFoundError,
  ForbiddenError,
  InternalServerError
};
