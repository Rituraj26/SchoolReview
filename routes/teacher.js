const router = require('express').Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

const {
    getTeachers,
    getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teacher');

router.route('/').get(getTeachers).post(protect, addTeacher);

router
    .route('/:id')
    .get(getTeacher)
    .put(protect, updateTeacher)
    .delete(protect, deleteTeacher);

module.exports = router;
