const mongoose = require('mongoose');

// Define the MongoDB connection url
const mogongoURL = 'mongodb://localhost:27017/hotels';

// Set up mongoDB connection
mongoose.connect(mogongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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
module.exports = db;