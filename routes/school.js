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
    .post(addSchool);

router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

router.route('/:id').get(getSchool).put(updateSchool).delete(deleteSchool);

router.route('/:id/photo').put(uploadPhoto);

module.exports = router;
