const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc Register User
// @route /auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
    // Destructuring to store password after hashing before storing in DB
    const { name, email, role, password } = req.body;

    const user = await User.create({ name, email, role, password });

    sendTokenResponse(user, 201, res);
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

    sendTokenResponse(user, 200, res);
});

// @desc Get current logged in user
// @route POST /auth/me
// @access Private

exports.getMe = asyncHandler(async (req, res, next) => {
    // if not logged in
    if (!req.user) {
        return next(new ErrorResponse(`Login to view your profile`, 400));
    }
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});

// @desc Forgot Password
// @route POST /auth/forgotPassword
// @access Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // console.log(req.user);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(
            new ErrorResponse(`No registered user with that email`, 400)
        );
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create Reset Url
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/resetPassword/${resetToken}`;
    // console.log(resetUrl);
    const message = `You are receiving this email because you have requested the reset of a password. Please make a PUT request to \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Token',
            message,
        });

        res.status(200).json({
            success: true,
            message: 'Email sent',
            data: user,
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        // console.log(err);

        return next(new ErrorResponse(`Email could not be sent`, 500));
    }
});

// @desc Reset Password
// @route PUT /auth/resetPassword/:resetToken
// @access Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(resetPasswordToken, '--', user);
    if (!user) {
        return next(new ErrorResponse(`Invalid Token`, 400));
    }
    // e56bee43f8b3085a4ff07642233997eb44f1d5d018bd69f11df7528fce2bf126
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc Update User Details
// @route PUT /auth/updateDetails
// @access Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
});

// @desc Update Password
// @route PUT /auth/updatePassword
// @access Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse(`Password is incorrect`, 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie, send response

const sendTokenResponse = async (model, statusCode, res) => {
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
