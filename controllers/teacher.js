const asyncHandler = require('../middleware/async');
const Teacher = require('../models/Teacher');

// @route GET /teachers
// @route GET /schools/:schoolId/teachers
// access Public

exports.getTeachers = asyncHandler(async (req, res, next) => {
    // console.log(req.params.schoolId);
    let query;
    if (req.params.schoolId) {
        query = Teacher.find({ school: req.params.schoolId });
    } else {
        query = Teacher.find();
    }

    const teachers = await Teacher.find(query).populate({
        path: 'school',
        select: 'name founded',
    });

    res.status(200).json({
        success: true,
        count: teachers.length,
        data: teachers,
    });
});

// @desc Get Teacher by id
// @route GET /teachers/:id
// access Public

exports.getTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id);

    // To handle properly formatted invalid id
    if (!teacher) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: teacher,
    });
});

// @desc Add a Teacher
// @route POST /teachers
// access Private

exports.addTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
        success: true,
        data: teacher,
    });
});

// @desc Update details of a Teacher
// @route PUT /teachers/:id
// access Private

exports.updateTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // To handle properly formatted invalid id
    if (!teacher) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: teacher,
    });
});

// @desc Delete details of a Teacher
// @route DELETE /teachers/:id
// access Private

exports.deleteTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    // To handle properly formatted invalid id
    if (!teacher) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: {},
    });
});
