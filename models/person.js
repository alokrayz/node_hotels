const mongoose = require('mongoose');

//Define the person schema
const personSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    age: { 
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
});

// Create the person model
const Person = mongoose.model('Person', personSchema); // Create the person model
// Export the Person model for use in other files
module.exports = Person;