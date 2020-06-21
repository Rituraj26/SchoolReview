const colors = require('colors');
const School = require('../models/School');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const { query } = require('express');

// @desc Get all schools
// @route GET /schools
// @access Public

exports.getSchools = asyncHandler(async (req, res, next) => {
    let query;

    let reqQuery = { ...req.query };

    // Fields to exclude so that it doesnot try to match DB model
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Delete the removeFields from query
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Replace gt with $gt
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    // Mongoose queries
    query = School.find(JSON.parse(queryStr)).populate({
        path: 'teachers',
        select: 'name dept exp',
    });

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const startInd = (page - 1) * limit;
    const endInd = page * limit;
    const total = await School.countDocuments();

    const pagination = {};

    if (startInd > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    if (endInd < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    // Skip will skip n documents from the arg
    query = query.skip(startInd).limit(limit);

    const school = await query;

    res.status(200).json({
        success: true,
        count: school.length,
        pagination,
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

exports.addSchool = asyncHandler(async (req, res, next) => {
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

    res.status(200).json({ success: true, data: school });
});

// @desc Delete a school
// @route DELETE /schools/:id
// @access Private

exports.deleteSchool = asyncHandler(async (req, res, next) => {
    const school = await School.findById(req.params.id);

    // To handle properly formatted invalid id
    if (!school) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    school.remove();

    res.status(200).json({ success: true, data: {} });
});

// @desc Get schools within a radius
// @route GET /schools/radius/:zipcode/:distance
// @access Public

exports.getSchoolInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    const result = await geocoder.geocode(zipcode);
    const lon = result[0].longitude;
    const lat = result[0].latitude;

    // Calc radius using radians
    // distance / earths radius
    const radius = distance / 6378;
    const schools = await School.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lon, lat], radius],
            },
        },
    });

    res.status(200).json({
        success: true,
        count: schools.length,
        data: schools,
    });
});
