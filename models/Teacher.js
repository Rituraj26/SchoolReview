const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: [true, 'Please add a teacher name'],
    },
    photo: {
        type: String,
        default: 'no-photo.jpg',
    },
    dept: {
        type: String,
        required: true,
        enum: [
            'Maths',
            'Science',
            'English',
            'S Science',
            'Computer',
            'Physics',
            'Chemistry',
            'Biology',
            'Physical Education',
        ],
    },
    exp: {
        type: Number,
        required: [true, 'Enter the no of years experienced'],
    },
    tution: {
        tutionAvailability: {
            type: Boolean,
            default: false,
        },
        tutionFee: Number,
    },
    contactUs: {
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        phoneNo: Number,
    },
    address: String,
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
