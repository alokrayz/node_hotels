const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Define the MongoDB connection url(tye local mogo db r)
// const mongoURL = process.env.MONGO_DB_LOCAL 
const mongoURL = process.env.MONGODb_URL


// Set up mongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

const db = mongoose.connection;

// Defiine event listeners for the database connection
db.on('connected', () => {                          // In database connection is established or not  ye btata ki connection established hai ya nahi
    console.log('MongoDB connected successfully');
});
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.on('disconnected', () => {   
    console.log('MongoDB disconnected');
});

// Export the db object for use in other files
module.exports = { connectDB, db };