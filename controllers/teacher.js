const asyncHandler = require('../middleware/async');
const Teacher = require('../models/Teacher');
const { query } = require('express');

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
