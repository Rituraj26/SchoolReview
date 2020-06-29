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

reviewSchema.statics.getAverageRating = async function (schoolId) {
    const obj = await this.aggregate([
        {
            $match: { school: schoolId },
        },
        {
            $group: {
                _id: '$school',
                averageRating: { $avg: '$rating' },
            },
        },
    ]);

    try {
        await this.model('School').findByIdAndUpdate(schoolId, {
            averageRating: obj[0].averageRating,
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after saving review
reviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.school);
});

// Call getAverageRating before removing review
reviewSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.school);
});

module.exports = mongoose.model('Review', reviewSchema);
