const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a school name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    slug: String,
    mainPhoto: {
        type: String,
        default: 'no-photo.jpg',
    },
    founded: Number,
    fees: {
        busFee: Number,
        tutionFee: Number,
        admissionFee: Number,
        hostelFee: Number,
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    // location: {
    //     //Geojson Point
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         required: true,
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true,
    //         index: '2dsphere',
    //     },
    //     formattedAddress: String,
    //     street: String,
    //     city: String,
    //     state: String,
    //     zipcode: String,
    //     country: String,
    // },
    awards: {
        title: String,
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
    },
    toppers: {
        name: String,
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        percentage: Number,
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must not be more than 10'],
    },
    contactUs: {
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        website: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS',
            ],
        },
        phoneNo: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('School', SchoolSchema);
