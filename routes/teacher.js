const router = require('express').Router({ mergeParams: true });
const { protect, authorization } = require('../middleware/auth');

const {
    getTeachers,
    getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teacher');

router
    .route('/')
    .get(getTeachers)
    .post(protect, authorization('publisher', 'teacher', 'admin'), addTeacher);

router
    .route('/:teacherId')
    .get(getTeacher)
    .put(protect, authorization('publisher', 'teacher', 'admin'), updateTeacher)
    .delete(
        protect,
        authorization('publisher', 'teacher', 'admin'),
        deleteTeacher
    );

module.exports = router;
