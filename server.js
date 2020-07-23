// Importing external packages
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
// const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const hpp = require('hpp');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env var
// dotenv.config({ path: './config/config.env' });
dotenv.config({ path: './config/configProd.env' });

// Connect Database
connectDB();

// Importing route files
const auth = require('./routes/auth');
const schools = require('./routes/school');
const teachers = require('./routes/teacher');
const users = require('./routes/users');
const reviews = require('./routes/review');

// Use BodyParser
app.use(express.json());

// File upload middleware
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Cookie Parser middleware
app.use(cookieParser());

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(expressMongoSanitize());

// Set security headers
app.use(helmet());

// Prevent Cross Site Scripting (XSS) attacks
// app.use(xssClean());

// Rate Limiting
const limiter = expressRateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Using routes middleware
app.use('/schools', schools);
app.use('/teachers', teachers);
app.use('/auth', auth);
app.use('/users', users);
app.use('/reviews', reviews);

// Using Error Handler
app.use(errorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
