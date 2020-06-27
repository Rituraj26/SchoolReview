const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please add a name`],
    },
    email: {
        type: String,
        required: [true, `Please add a name`],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['user', 'teacher', 'publisher'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, `Please add a password`],
        minlength: [6, `Please add a minimum of 6 characters`],
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash password and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    console.log('From user model', this.resetPasswordToken);

    // Set expiry
    this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', userSchema);
