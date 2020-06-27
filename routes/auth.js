const router = require('express').Router();
const {
    register,
    login,
    getMe,
    resetPassword,
    forgotPassword,
    updateDetails,
    updatePassword,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').put(resetPassword);
router.route('/updateDetails').put(protect, updateDetails);
router.route('/updatePassword').put(protect, updatePassword);

module.exports = router;
