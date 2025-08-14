const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Import the Person model

// Post route to add a person
router.post('/',  async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data
        const newPerson = new Person(data); // Create a new Person document usin the mongooe model
        
        const response = await newPerson.save() // Save the new person to the database (wait kro iske liye jb tk data save nahi ho jata)
        console.log('Data saved')
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error:'Failed to save person data' });
    }
})

// Get route to fetch all persons
router.get('/', async (req,res) => {
    try {
        const data = await Person.find(); // Fetch all persons from the database
        console.log('Data fetched successfully');
         // Send the persons as a JSON response
        res.status(200).json(data); // Send the persons as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error:'Failed to save person data' });
    }
})

// Get route to fetch persons by work type
router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType; // Get the work type from the request parameters
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const data = await Person.find({ work: workType }); // Fetch persons with the specified work type
            console.log(`Persons with work type ${workType} fetched successfully`);
            res.status(200).json(data); // Send the persons as a JSON response
        } else {
            res.status(400).json({ error: 'Invalid work type' }); // Handle invalid work type
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch persons by work type' }); // Handle errors and send an error response
    }
})

router.put('/:id', async(req,res)=>{
    try {
        const personId = req.params.id; // Get the person ID from the request parameters
        const updatedPersonData = req.body; // Get the updated person data from the request body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true // Run schema validation on the update
        })
        if(!response) {
            return res.status(404).json({ error: 'Person not found' }); // Handle case where person is not found
        }   
        console.log('Person updated successfully');
        res.status(200).json(response); // Send the updated person as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update person data' }); //
    }
})

router.delete('/:id', async(req,res) => {
    try {
        const personId = req.params.id; // Get the person ID from the request parameters
        const response = await Person.findByIdAndDelete(personId); // Delete the person by ID
        if(!response) {
            return res.status(404).json({ error: 'Person not found' }); // Handle case where person is not found
        }
        console.log('Person deleted successfully');
        res.status(200).json({ message: 'Person deleted successfully' }); // Send success message
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete person data' }); //
    }
})

module.exports = router; // Export the router to be used in the main server file