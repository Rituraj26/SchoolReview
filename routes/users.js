const router = require('express').Router({ mergeParams: true });

const User = require('../models/User');

const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorization } = require('../middleware/auth');

router.use(protect);
router.use(authorization('admin'));

router.route('/').get(advancedResults(User), getUsers).post(addUser);

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
