const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    price: { 
        type: Number,
        required: true,
    },  
    taste: {
        type: String,
        enum: ['spicy', 'sweet', 'sour', ],
        required: true
    },
    is_drink: {
        type: Boolean,
        required: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,   
        default: 0,
    },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);  // Create the menu item model
module.exports = MenuItem;