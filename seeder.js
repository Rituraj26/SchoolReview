const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

const School = require('./models/School');
const Teacher = require('./models/Teacher');

// Connect Database
connectDB();

// Read Json Files
const schools = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/schools.json`, 'utf-8')
);

const teachers = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/teachers.json`, 'utf-8')
);

// Import to DB
const importData = async () => {
    try {
        await School.create(schools);
        await Teacher.create(teachers);
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
