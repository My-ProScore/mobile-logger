const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import models
const Log = require('./models/Log');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "static" directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js MongoDB API');
});

// Sample API endpoints
app.get('/api/log', async (req, res) => {
    try {
        const logs = await Log.find().sort({ createdAt: -1 }).limit(10);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/savelog', async (req, res) => {
    const { userId, apiEndpoint, requestMetadata, responseMetadata } = req.body;
    const log = new Log({
        userId,
        apiEndpoint,
        requestMetadata,
        responseMetadata
    });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});