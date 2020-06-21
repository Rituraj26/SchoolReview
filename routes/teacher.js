const router = require('express').Router({ mergeParams: true });

const { getTeachers } = require('../controllers/teacher');

router.route('/').get(getTeachers);

module.exports = router;
