const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc Get all users
// @route GET /users
// @access Private / Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc Get an user
// @route GET /users/:userId
// @access Private / Admin

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new ErrorResponse(`User not found`, 400));
    }

    res.status(200).json({ success: true, data: user });
});

// @desc Add an user
// @route POST /users
// @access Private / Admin

exports.addUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({ success: true, data: user });
});

// @desc Update an user
// @route PUT /users/:userId
// @access Private / Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
});

// @desc Delete an user
// @route DELETE /users/:userId
// @access Private / Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ success: true, data: {} });
});
