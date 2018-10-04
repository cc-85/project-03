function errorHandler(err, req, res, next) {
  let status = 500;
  let message = err.message;

  if(err.message === 'Unauthorized') status = 401;
  if(err.message === 'Not Found') status = 404;
  if(err.name === 'CastError') {
    status = 404;
    message = 'Not Found';
  }
  if(err.name === 'JsonWebTokenError') status = 400;
  if(err.name === 'ValidationError') status = 422;

  res.status(status).json({ message: message });
  next(err); // error will now display on the terminal as well.
}

module.exports = errorHandler;
