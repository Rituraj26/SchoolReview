const router = require('express').Router({ mergeParams: true });
const Review = require('../models/Review');

const advancedResults = require('../middleware/advancedResults');

const { getReviews, getReview } = require('../controllers/review');

router.route('/').get(
    advancedResults(Review, {
        path: 'school',
        select: 'name founded',
    }),
    getReviews
);

router.route('/:reviewId').get(getReview);

module.exports = router;
