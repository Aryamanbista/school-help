const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

// Load Models
const User = require('../models/User');
const School = require('../models/School');
const Request = require('../models/Request'); // To clear old requests
const Offer = require('../models/Offer');   // To clear old offers

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// --- OUR SEED DATA ---
const schools = [
    {
        _id: new mongoose.Types.ObjectId("632a1b7e1c8a4f001f8e4b1a"), // Static ID for predictability
        schoolName: "City High School",
        address: "123 Main St",
        city: "Metroville"
    }
];

const admins = [
    {
        username: 'admin',
        password: 'password', // It will be hashed automatically by our User model
        fullname: 'Admin User',
        email: 'admin@school.com',
        role: 'School Admin',
        position: 'Principal',
        school: "632a1b7e1c8a4f001f8e4b1a" // Link to the City High School ID
    }
];
// --- END OF SEED DATA ---


// Function to import data into DB
const importData = async () => {
    try {
        // Clear existing data first
        await User.deleteMany();
        await School.deleteMany();
        await Request.deleteMany();
        await Offer.deleteMany();

        // Insert new data
        await School.insertMany(schools);
        await User.insertMany(admins);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error}`);
        process.exit(1);
    }
};

// Function to destroy data from DB
const destroyData = async () => {
    try {
        await User.deleteMany();
        await School.deleteMany();
        await Request.deleteMany();
        await Offer.deleteMany();

        console.log('✅ Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error}`);
        process.exit(1);
    }
};

// Check for command line arguments to run the functions
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}