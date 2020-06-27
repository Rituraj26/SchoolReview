const router = require('express').Router();
const {
    register,
    login,
    getMe,
    resetPassword,
    forgotPassword,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').put(resetPassword);

module.exports = router;
