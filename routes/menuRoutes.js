const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Import the MenuItem model

router.get('/', async(req, res) => {
    try{
        const data = await MenuItem.find(); // Fetch all menu items from the database
        console.log('Menu fetched successfully');
        res.status(200).json(data); // Send the menu items as a JSON response
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch menu data' }); 
    }
})

router.post('/', async (req, res) => {
    try {
        const data =req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save(); // Save the new menu item to the database
        console.log('Menu item saved successfully');
        res.status(200).json(response); // Send the saved menu item as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to save menu item' }); // Handle errors and send an error response
    }
})

module.exports = router; // Export the router to be used in the main server file