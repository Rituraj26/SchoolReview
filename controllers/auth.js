const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc Register User
// @route /auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
    // Destructuring to store password after hashing before storing in DB
    const { name, email, role, password } = req.body;
    const user = await User.create({ name, email, role, password });
    const token = user.getSignedJwtToken();
    res.status(201).json({ success: true, data: token });
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

    // Create Token
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, data: token });
});
