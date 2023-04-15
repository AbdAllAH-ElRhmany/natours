const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid iput data. ${errors.join('. ')}`;
  //   console.log(9999999999, message);
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  //   console.log(err.keyValue.name);
  //   let value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
  const message = `Duplicate field value: ${err.keyValue.name}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid token, Please log in again!', 401);
const handleJWTErrorExpired = () =>
  new AppError('Token expired, Please log in again!', 401);

const sendErrorDev = (err, req, res) => {

  if(req.originalUrl.startsWith('/api')){
    // API
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
    // RENDERED WEBSITE
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  })

};
const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if(req.originalUrl.startsWith('/api')){
    // API
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // Programming or other unknown error: dont't leak error details
    }
    // 1) Log error
    console.error('ERROR!!', err);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });

  } 
  // RENDERED WEBSITE
  if (err.isOpertional) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    })
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg:'Something went wrong!'
  })
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
    // if (err.name === 'TokenExpiredError') err = handleJWTErrorExpired(err);
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTErrorExpired();
    // console.log(88888888888888, error);
    sendErrorProd(error, req, res);
  }
};
