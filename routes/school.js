const express = require('express');
const router = express.Router();

const {
    getSchools,
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
} = require('../controllers/school');

router.route('/').get(getSchools).post(createSchool);

router.route('/:id').get(getSchool).put(updateSchool).delete(deleteSchool);

module.exports = router;
