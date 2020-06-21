const router = require('express').Router({ mergeParams: true });

const {
    getTeachers,
    getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teacher');

router.route('/').get(getTeachers).post(addTeacher);

router.route('/:id').get(getTeacher).put(updateTeacher).delete(deleteTeacher);

module.exports = router;
