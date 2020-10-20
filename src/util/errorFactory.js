const { NotFoundError, InternalServerError } = require('./error/errors');

function errorFactory(req, res, next) {
  const genericError = {
    _buildError(error, ErrorClass, query) {
      const errorMessage = error instanceof Error ? error.message : error;
      const errorToForward = new ErrorClass(errorMessage, query);
      next(errorToForward);
    },
    factory(error, query) {
      if (error.statusCode === 404) {
        return genericError._buildError(error, NotFoundError, query);
      }
      return genericError._buildError(error, InternalServerError, query);
    }
  };
  return genericError;
}

module.exports = errorFactory;
