const express = require('express');
const router = express.Router();

const {
    getSchools,
    getSchool,
    addSchool,
    updateSchool,
    deleteSchool,
    getSchoolInRadius,
    uploadPhoto,
} = require('../controllers/school');
const School = require('../models/School');

const { protect, authorization } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

// Include other resource router
const teacherRouter = require('./teacher');
const reviewRouter = require('./review');

// Multer file upload configuration
const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const imageFilter = (req, file, cb) => {
    if (!file) {
        return cb(new Error(`Please upload a photo`), false);
    }

    if (!file.mimetype.startsWith('image')) {
        return cb(new Error('Please upload an image file'), false);
    }

    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

// Re-route into other resources
router.use('/:schoolId/teachers', teacherRouter);
router.use('/:schoolId/reviews', reviewRouter);

router
    .route('/')
    .get(
        advancedResults(School, {
            path: 'teachers',
            select: 'teacherName dept exp',
        }),
        getSchools
    )
    .post(protect, authorization('publisher', 'admin'), addSchool);

router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

router
    .route('/:id/photo')
    .put(
        protect,
        authorization('publisher', 'admin'),
        upload.single('file'),
        uploadPhoto
    );

router
    .route('/:id')
    .get(getSchool)
    .put(protect, authorization('publisher', 'admin'), updateSchool)
    .delete(protect, authorization('publisher', 'admin'), deleteSchool);

module.exports = router;
