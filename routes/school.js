const express = require('express');
const router = express.Router();

const {
    getSchools,
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
    getSchoolInRadius,
} = require('../controllers/school');

// Include other resource router
const teacherRouter = require('./teacher');

// Re-route into other resources
router.use('/:schoolId/teachers', teacherRouter);

router.route('/').get(getSchools).post(createSchool);

router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

router.route('/:id').get(getSchool).put(updateSchool).delete(deleteSchool);

module.exports = router;
