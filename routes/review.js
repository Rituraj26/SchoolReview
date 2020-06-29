const express = require('express');
const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview,
} = require('../controllers/review');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorization } = require('../middleware/auth');

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

router
    .route('/:reviewId')
    .get(getReview)
    .put(protect, authorization('user', 'admin'), updateReview)
    .delete(protect, authorization('user', 'admin'), deleteReview);

module.exports = router;
