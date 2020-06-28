const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxlength: 100,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
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
});

reviewSchema.index({ school: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
