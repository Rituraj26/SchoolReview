const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const School = require('../models/School');

// @desc      Get reviews
// @route     GET /reviews
// @route     GET /schools/:schoolId/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.schoolId) {
        const reviews = await Review.find({ school: req.params.schoolId });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews,
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @desc Get a review
// @route GET /reviews/:reviewId
// @access Public

exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId).populate({
        path: 'school',
        select: 'name founded',
    });

    if (!review) {
        return next(new ErrorResponse(`No review found with that id`, 400));
    }

    res.status(200).json({ success: true, data: review });
});

// @desc Add a review
// @route POST /reviews
// @access Private

exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    req.body.school = req.params.schoolId;
    req.body.reviewOwner = req.user.name;

    const school = await School.findById(req.params.schoolId);

    if (!school) {
        return next(new ErrorResponse(`No school available`, 400));
    }

    const review = await Review.create(req.body);

    res.status(201).json({ success: true, data: review });
});

// @desc Update a review
// @route PUT /reviews/:reviewId
// @access Private

exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.reviewId);

    if (!review) {
        return next(new ErrorResponse(`No review found with that id`, 400));
    }
    // console.log(typeof review.user);
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`You are not allowed to edit others reviews`, 401)
        );
    }

    review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
        new: true,
        runValidators: true,
    });

    review.save();

    res.status(200).json({ success: true, data: review });
});

// @desc Delete a review
// @route DELETE /reviews/:reviewId
// @access Private

exports.deleteReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.reviewId);

    if (!review) {
        return next(new ErrorResponse(`No review found with that id`, 400));
    }
    // console.log(typeof review.user);
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `You are not allowed to delete other's reviews`,
                401
            )
        );
    }

    await review.remove();

    res.status(200).json({ success: true, data: {} });
});
