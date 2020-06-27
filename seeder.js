const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

const School = require('./models/School');
const Teacher = require('./models/Teacher');
const User = require('./models/User');
const Review = require('./models/Review');

// Connect Database
connectDB();

// Read Json Files
const schools = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/schools.json`, 'utf-8')
);

const teachers = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/teachers.json`, 'utf-8')
);

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);

// Import to DB
const importData = async () => {
    try {
        await School.create(schools);
        await Teacher.create(teachers);
        await User.create(users);
        await Review.create(reviews);
        console.log('Data Imported Succesfully'.blue.bgWhite);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await School.deleteMany();
        await Teacher.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data Deleted Succesfully'.red.bgWhite);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
