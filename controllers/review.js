const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');

// @desc Get all reviews
// @route GET /reviews
// @access Public

exports.getReviews = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});
