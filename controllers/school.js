const colors = require('colors');
const School = require('../models/School');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all schools
// @route GET /schools
// @access Public

exports.getSchools = asyncHandler(async (req, res, next) => {
    const school = await School.find();
    res.status(200).json({
        success: true,
        count: school.length,
        data: school,
    });
});

// @desc Get a single school
// @route GET /schools/:id
// @access Public

exports.getSchool = asyncHandler(async (req, res, next) => {
    const school = await School.findById(req.params.id);

    // To handle properly formatted invalid id
    if (!school) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: school,
    });
});

// @desc Create a school
// @route POST /schools
// @access Private

exports.createSchool = asyncHandler(async (req, res, next) => {
    const school = await School.create(req.body);
    res.status(201).json({ success: true, data: school });
});

// @desc Update a school
// @route PUT /schools/:id
// @access Private

exports.updateSchool = asyncHandler(async (req, res, next) => {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // To handle properly formatted invalid id
    if (!school) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    res.status(201).json({ success: true, data: school });
});

// @desc Delete a school
// @route DELETE /schools/:id
// @access Private

exports.deleteSchool = asyncHandler(async (req, res, next) => {
    const school = await School.findByIdAndDelete(req.params.id);

    // To handle properly formatted invalid id
    if (!school) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    res.status(200).json({ success: true, data: {} });
});
