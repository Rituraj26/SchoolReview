const express = require('express');
const router = express.Router();

const {
    getSchools,
    getSchool,
    addSchool,
    updateSchool,
    deleteSchool,
    getSchoolInRadius,
    uploadPhoto,
} = require('../controllers/school');
const School = require('../models/School');

const { protect, authorization } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

// Include other resource router
const teacherRouter = require('./teacher');
const reviewRouter = require('./review');

// Re-route into other resources
router.use('/:schoolId/teachers', teacherRouter);
router.use('/:schoolId/reviews', reviewRouter);

router
    .route('/')
    .get(
        advancedResults(School, {
            path: 'teachers',
            select: 'name dept exp',
        }),
        getSchools
    )
    .post(protect, authorization('publisher', 'admin'), addSchool);

router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

router
    .route('/:id/photo')
    .put(protect, authorization('publisher', 'admin'), uploadPhoto);

router
    .route('/:id')
    .get(getSchool)
    .put(protect, authorization('publisher', 'admin'), updateSchool)
    .delete(protect, authorization('publisher', 'admin'), deleteSchool);

module.exports = router;
