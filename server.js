const express = require('express');// cosnt express = require('express')
const app = express()
const db = require('./db'); // Import the database connection
const { connectDB } = require('./db'); // adjust path
require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON request bodies to req.body(ye ise req.body m save krdeta hai)



app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Booking API');
})

const personRoutes = require('./routes/personRoutes'); // Import the person routes
const menuItemRoutes = require('./routes/menuRoutes'); // Import the menu routes

app.use('/menu', menuItemRoutes); // Use the menu routes under the /menu path
app.use('/person', personRoutes); // Use the person routes under the /api path

const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
connectDB();
