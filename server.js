// Importing external packages
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const colors = require('colors');

// Importing local files
const connectDB = require('./config/db');
const school = require('./routes/school');
const errorHandler = require('./middleware/error');

// Load env var
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

// Use BodyParser
app.use(express.json());

//
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Using routes middleware
app.use('/schools', school);

// Using Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
