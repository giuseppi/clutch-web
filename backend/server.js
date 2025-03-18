require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON requests

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.use((req, res) => {
  console.log('request made');
});

app.get('/', (req, res) => {});

app.get('*', (req, res) => {
  res.send('nonexistent path');
});

app.listen(8080, () => {
  console.log('Listening on Port 8080');
});
