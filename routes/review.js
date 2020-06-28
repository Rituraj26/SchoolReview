const router = require('express').Router({ mergeParams: true });
const Review = require('../models/Review');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorization } = require('../middleware/auth');

const { getReviews, getReview, addReview } = require('../controllers/review');

router
    .route('/')
    .get(
        advancedResults(Review, {
            path: 'school',
            select: 'name founded',
        }),
        getReviews
    )
    .post(protect, authorization('user', 'admin'), addReview);

router.route('/:reviewId').get(getReview);

module.exports = router;
