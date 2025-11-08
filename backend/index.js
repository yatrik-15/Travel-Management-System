// --- 1. Import Packages ---
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- 2. App Setup ---
const app = express();
const port = 3000;

// --- 3. Middleware ---
// Enable CORS so your frontend (on a different URL) can make requests
app.use(cors()); 
// Enable Express to parse JSON data in the request body
app.use(express.json());

// --- 4. MongoDB Connection ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// --- 5. Mongoose Schema & Model ---
// This blueprint matches your frontend form IDs: "name", "email", "phone"
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true // No two customers can have the same email
  },
  phone: {
    type: String,
    required: true
  }
});

// This creates a collection in MongoDB called "customers"
const Customer = mongoose.model('Customer', customerSchema);


// --- 6. API Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Travel Agency Backend API!');
});

//
// --- THIS IS THE API ROUTE YOUR FRONTEND WILL CALL ---
//
app.post('/api/customers', async (req, res) => {
  try {
    // 1. Get the data from the frontend's request body
    const { name, email, phone } = req.body;

    // 2. Validate the data
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 3. Create a new customer document
    const newCustomer = new Customer({
      name,
      email,
      phone
    });

    // 4. Save it to the database
    const savedCustomer = await newCustomer.save();

    // 5. Send a success response back to the frontend
    res.status(201).json(savedCustomer);

  } catch (error) {
    // Handle errors (like a duplicate email)
    if (error.code === 11000) {
      return res.status(400).json({ message: "This email address is already in use." });
    }
    res.status(400).json({ message: error.message });
  }
});


// --- 7. Start Server ---
app.listen(port, () => {
  console.log(`Server is running successfully on http://localhost:${port}`);
});