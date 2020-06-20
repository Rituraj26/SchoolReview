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

router.route('/').get(getSchools).post(createSchool);

router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

router.route('/:id').get(getSchool).put(updateSchool).delete(deleteSchool);

module.exports = router;
