const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc Register User
// @route /auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
    // Destruturing to store password after hashing before storing in DB
    const { name, email, role, password } = req.body;
    const user = await User.create({ name, email, role, password });
    const token = user.getSignedJwtToken();
    res.status(201).json({ success: true, data: token });
});
