

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');


const PORT = process.env.PORT || 3001;



const app = express();
app.use(cors());
app.use(express.json());

app.post('/run-campaign', (req, res) => {
  const { searchEngine, keywords, domainName } = req.body;

  // Join keywords into one phrase
  const keywordPhrase = keywords.join(' ');
  
  // Ensure the script path is correct
  const scriptPath = path.join(__dirname, '../puppeteer/campaignRunner.js');
  
  // Command to run the Puppeteer script
  const command = `node "${scriptPath}" "${keywordPhrase}" "${domainName}" ${searchEngine}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Execution failed', details: stderr || error.message });
    }
    
   // If execution is successful, send back the output
    return res.json({ message: 'Campaign executed successfully', output: stdout });
  });
});

app.listen(3001, () => {
  console.log('✅ Server running on http://localhost:3001');
});

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

























