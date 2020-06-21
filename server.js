// Importing external packages
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const colors = require('colors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env var
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

// Importing route files
const school = require('./routes/school');
const teacher = require('./routes/teacher');

// Use BodyParser
app.use(express.json());

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Using routes middleware
app.use('/schools', school);
app.use('/teachers', teacher);

// Using Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
