

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());          // Enable CORS
app.use(express.json());  // Parse incoming JSON requests

// Define the POST route for /start-campaign
app.post('/run-campaign', (req, res) => {
  console.log('📨 Received start campaign request:', req.body);
  
  // Logic for starting the campaign (e.g., saving campaign data)
  
  // Respond with a success message
  res.json({ status: 'success', message: 'Campaign started!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
