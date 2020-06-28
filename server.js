// Importing external packages
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env var
dotenv.config({ path: './config/config.env' });

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

// Using routes middleware
app.use('/schools', schools);
app.use('/schools/:schoolId/teachers', teachers);
app.use('/auth', auth);
app.use('/users', users);
app.use('/schools/:schoolId/reviews', reviews);

// Using Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
