const colors = require('colors');
const School = require('../models/School');

// @desc Get all schools
// @route GET /schools
// @access Public

exports.getSchools = async (req, res, next) => {
    try {
        const school = await School.find();
        res.status(200).json({
            success: true,
            count: school.length,
            data: school,
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

// @desc Get a single school
// @route GET /schools/:id
// @access Public

exports.getSchool = async (req, res, next) => {
    try {
        const school = await School.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: school,
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

// @desc Create a school
// @route POST /schools
// @access Private

exports.createSchool = async (req, res, next) => {
    try {
        const school = await School.create(req.body);
        res.status(201).json({ success: true, data: school });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc Update a school
// @route PUT /schools/:id
// @access Private

exports.updateSchool = async (req, res, next) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(201).json({ success: true, data: school });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc Delete a school
// @route DELETE /schools/:id
// @access Private

exports.deleteSchool = async (req, res, next) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
