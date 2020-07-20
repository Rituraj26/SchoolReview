const mongoose = require('mongoose');
const slugify = require('slugify');

const geocoder = require('../utils/geocoder');

const SchoolSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            required: [true, 'Please add a school name'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        description: {
            type: String,
            maxlength: [500, 'Description cannot be more than 500 characters'],
            default: 'No Description Available',
        },
        slug: String,
        schoolPhoto: {
            photoName: {
                type: String,
                default: 'no-photo.jpg',
            },
            photoPath: String,
        },
        address: {
            type: String,
            required: [true, 'Please add an address'],
        },
        location: {
            //Geojson Point
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                required: true,
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String,
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
            phoneNo: String,
        },
        founded: {
            type: Number,
            required: [true, 'Please add the year when your school is founded'],
        },
        feeStructure: {
            busFee: String,
            tutionFee: String,
            admissionFee: String,
            hostelFee: String,
        },
        scholarshipAvailable: {
            type: Boolean,
            default: false,
        },
        toppers: [
            {
                topperName: String,
                topperPhoto: {
                    type: String,
                    default: 'no-photo.jpg',
                },
                topperPercentage: Number,
            },
        ],
        awards: [
            {
                awardTitle: String,
                awardPhoto: {
                    type: String,
                    default: 'no-photo.jpg',
                },
                awardYear: Number,
            },
        ],

        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [10, 'Rating must not be more than 10'],
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
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

SchoolSchema.pre('save', function (next) {
    this.slug = slugify(this.schoolName, { lower: true });
    next();
});

SchoolSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);

    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    };
    next();
});

// Cascade Delete Teachers when a school is deleted
SchoolSchema.pre('remove', async function (next) {
    await this.model('Teacher').deleteMany({
        school: this._id,
    });
    next();
});

// Cascade Delete Reviews when a school is deleted
SchoolSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({
        school: this._id,
    });
    next();
});

// Reverse Populate using virtuals
SchoolSchema.virtual('teachers', {
    ref: 'Teacher',
    localField: '_id',
    foreignField: 'school',
    justOne: false,
});

// Reverse Populate using virtuals
SchoolSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'school',
    justOne: false,
});

module.exports = mongoose.model('School', SchoolSchema);
