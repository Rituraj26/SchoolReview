const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
    // console.log(req.headers);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Make sure token exits
    if (!token) {
        return next(
            new ErrorResponse(`Not authorized to access this route`, 401)
        );
    }

    try {
        // Verify token
        const decodedId = jwt.verify(token, process.env.JWT_SECRET);

        // Getting the logged in user
        req.user = await User.findById(decodedId.id);
        next();
    } catch (err) {
        next(new ErrorResponse(`Not authorized to access this route`, 401));
    }
});
