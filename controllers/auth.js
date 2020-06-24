const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc Register User
// @route /auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
    // Destructuring to store password after hashing before storing in DB
    const { name, email, role, password } = req.body;

    const user = await User.create({ name, email, role, password });

    sendTokenReponse(user, 201, res);
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse(`Please provide email and password`),
            400
        );
    }

    // Check for user
    const user = await User.findOne({ email }).select('password');

    // No user available
    if (!user) {
        return next(
            new ErrorResponse(`No registered user with this email`),
            400
        );
    }

    // Compare whether the entered password is same as the password present in DB
    const isMatch = await user.matchPassword(password);

    // if password didn't match
    if (!isMatch) {
        return next(
            new ErrorResponse(
                `Password didn't match, Please enter the correct password`
            ),
            401
        );
    }

    sendTokenReponse(user, 200, res);
});

// @desc Get current logged in user
// @route POST /auth/me
// @access Private

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});

// Get token from model, create cookie, send response

const sendTokenReponse = async (model, statusCode, res) => {
    // Create Token
    const token = model.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, data: token });
};
