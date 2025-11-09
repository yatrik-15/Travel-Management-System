// --- 1. Import Packages ---
require('dotenv').config(); // Loads .env file secrets
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- 2. App Setup ---
const app = express();
const port = 3000; // Your frontend will send data to this port

// --- 3. Middleware ---
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Allow app to read JSON data

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
// This "blueprint" matches the form in your index.html
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  packageId: { // This comes from the 'pkg' variable in your frontend
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds 'createdAt' and 'updatedAt' fields
});

// This will create a collection in MongoDB called "bookings"
const Booking = mongoose.model('Booking', bookingSchema);


// --- 6. API Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Travel Agency Backend API!');
});

//
// --- THIS IS THE API ROUTE YOUR FRONTEND WILL CALL ---
// It listens for a POST request at http://localhost:3000/api/bookings
//
app.post('/api/bookings', async (req, res) => {
  try {
    // 1. Get the data from the frontend's 'fetch' request
    const { name, email, phone, pkg } = req.body;

    // 2. Validate the data
    if (!name || !email || !phone || !pkg) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 3. Create a new booking document using the Mongoose model
    const newBooking = new Booking({
      name: name,
      email: email,
      phone: phone,
      packageId: pkg // We save the package ID (e.g., 'paris-getaway')
    });

    // 4. Save the new booking to the database
    const savedBooking = await newBooking.save();

    // 5. Send a success response back to the frontend
    console.log('Booking saved:', savedBooking);
    res.status(201).json(savedBooking);

  } catch (error) {
    console.error('Booking save error:', error);
    res.status(500).json({ message: "There was an error saving the booking." });
  }
});


// --- 7. Start Server ---
app.listen(port, () => {
  console.log(`Server is running successfully on http://localhost:${port}`);
});