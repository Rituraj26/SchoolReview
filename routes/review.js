const router = require('express').Router();
const Review = require('../models/Review');

const advancedResults = require('../middleware/advancedResults');

const { getReviews } = require('../controllers/review');

router.route('/').get(
    advancedResults(Review, {
        path: 'bootcamp',
        select: 'name description',
    }),
    getReviews
);

module.exports = router;
