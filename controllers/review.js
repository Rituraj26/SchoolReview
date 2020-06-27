const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');

// @desc Get all reviews
// @route GET /reviews
// @access Public

exports.getReviews = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
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
