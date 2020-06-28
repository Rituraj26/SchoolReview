const colors = require('colors');
const path = require('path');
const School = require('../models/School');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc Get all schools
// @route GET /schools
// @access Public

exports.getSchools = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc Get a single school
// @route GET /schools/:id
// @access Public

exports.getSchool = asyncHandler(async (req, res, next) => {
    const school = await School.findById(req.params.id)
        .populate({
            path: 'teachers',
            select: 'name dept exp',
        })
        .populate({ path: 'reviews', select: 'title description rating' });

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
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for published school
    const publishedSchool = await School.findOne({ user: req.body.user });

    if (publishedSchool && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User has already published a school`, 400)
        );
    }

    const school = await School.create(req.body);
    res.status(201).json({ success: true, data: school });
});

// @desc Update a school
// @route PUT /schools/:id
// @access Private

exports.updateSchool = asyncHandler(async (req, res, next) => {
    let school = await School.findById(req.params.id);

    // To handle properly formatted invalid id
    if (!school) {
        return next(new ErrorResponse(`Resource not found`, 404));
    }

    // Make sure user is the original publisher of the school
    if (school.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User is not authorized to update other school details`,
                401
            )
        );
    }

    school = await School.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

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

    if (school.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User not authorized to delete the school details`
            ),
            401
        );
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

// @desc Upload school photo
// @route PUT /schools/:id/photo
// @access Private

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
    const school = await School.findById(req.params.id);

    if (!school) {
        return next(new ErrorResponse(`Resouce not found`), 404);
    }

    if (school.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User not authorized to upload a photo for the school`
            ),
            401
        );
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a photo`), 400);
    }

    const file = req.files.file;

    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`), 400);
    }

    if (file.size > process.env.MAX_IMAGE_UPLOAD_SIZE) {
        return next(
            new ErrorResponse(`Please upload an image less than 1MB`),
            400
        );
    }

    file.name = `photo_${school._id}${path.parse(file.name).ext}`;
    console.log(file.name);

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            return next(new ErrorResponse(`Problem with the file upload`), 500);
        }
        await School.findByIdAndUpdate(req.params.id, { photo: file.name });
    });

    res.status(200).json({ success: true, data: file.name });
});
