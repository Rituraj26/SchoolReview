const asyncHandler = require('../middleware/async');
const Teacher = require('../models/Teacher');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const colors = require('colors');
const School = require('../models/School');

// @desc Get all teachers and teachers for a particular school
// @route GET /teachers
// @route GET /schools/:schoolId/teachers
// access Public

exports.getTeachers = asyncHandler(async (req, res, next) => {
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
// @route GET /schools/:schoolsId/teachers/:teacherId
// access Public

exports.getTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.teacherId);

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
// @route POST /schools/:schoolId/teachers
// access Private

exports.addTeacher = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    req.body.school = req.params.schoolId;

    if (req.user.role === 'teacher') {
        const presentTeacher = await Teacher.findOne({ user: req.user.id });
        if (presentTeacher) {
            return next(
                new ErrorResponse(
                    `User is not allowed to add details for another teacher`,
                    401
                )
            );
        }
    } else if (req.user.role === 'publisher') {
        const publisherTeacher = await School.find({ user: req.user.id });
        // console.log(publisherTeacher);
        // console.log(req.params.schoolId, publisherTeacher[0].id);
        if (
            !publisherTeacher.length ||
            req.params.schoolId !== publisherTeacher[0].id
        ) {
            return next(
                new ErrorResponse(
                    `Publisher is not allowed to add details for another school teacher`,
                    401
                )
            );
        }
    }

    const teacher = await Teacher.create(req.body);

    res.status(201).json({
        success: true,
        data: teacher,
    });
});

// @desc Update details of a Teacher
// @route PUT /schools/:schoolId/teachers/:teacherId
// access Private

exports.updateTeacher = asyncHandler(async (req, res, next) => {
    let teacher = await Teacher.findById(req.params.teacherId);

    if (!teacher) {
        return next(new ErrorResponse(`Resource not found`, 400));
    }

    if (req.user.role === 'teacher' && teacher.user !== req.user.id) {
        return next(
            new ErrorResponse(
                `User is not allowed to edit details for another teacher`,
                401
            )
        );
    } else if (req.user.role === 'publisher') {
        const publisherTeacher = await School.find({ user: req.user.id });

        if (
            !publisherTeacher.length ||
            req.params.schoolId !== publisherTeacher[0].id
        ) {
            return next(
                new ErrorResponse(
                    `Publisher is not allowed to edit details for another school teacher`,
                    401
                )
            );
        }
    }

    teacher = await Teacher.findByIdAndUpdate(req.params.teacherId, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: teacher,
    });
});

// @desc Delete details of a Teacher
// @route DELETE /schools/:schoolId/teachers/:teacherId
// access Private

exports.deleteTeacher = asyncHandler(async (req, res, next) => {
    let teacher = await Teacher.findById(req.params.teacherId);

    if (!teacher) {
        return next(new ErrorResponse(`Resource not found`, 400));
    }

    if (req.user.role === 'teacher' && teacher.user !== req.user.id) {
        return next(
            new ErrorResponse(
                `User is not allowed to delete details for another teacher`,
                401
            )
        );
    } else if (req.user.role === 'publisher') {
        const publisherTeacher = await School.find({ user: req.user.id });

        if (
            !publisherTeacher.length ||
            req.params.schoolId !== publisherTeacher[0].id
        ) {
            return next(
                new ErrorResponse(
                    `Publisher is not allowed to delete details for another school teacher`,
                    401
                )
            );
        }
    }

    teacher.remove();

    res.status(200).json({
        success: true,
        data: {},
    });
});
