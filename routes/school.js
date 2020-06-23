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

const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

// Include other resource router
const teacherRouter = require('./teacher');

// Re-route into other resources
router.use('/:schoolId/teachers', teacherRouter);

router
    .route('/')
    .get(
        advancedResults(School, {
            path: 'teachers',
            select: 'name dept exp',
        }),
        getSchools
    )
    .post(protect, addSchool);

router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

router
    .route('/:id')
    .get(getSchool)
    .put(protect, updateSchool)
    .delete(protect, deleteSchool);

router.route('/:id/photo').put(protect, uploadPhoto);

module.exports = router;
