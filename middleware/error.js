const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // For Development Error logs
    console.log(err.stack.red.bgYellow);

    // console.log(error);

    // Mongoose bad Objectid
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate field handler
    if (error.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

module.exports = errorHandler;
