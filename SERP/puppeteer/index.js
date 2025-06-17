// index.js
const { runCampaign } = require('./campaignRunner');  // Import function from campaignRunner.js

// Set search parameters
const searchEngine = 'google';  // Use 'google', 'bing', etc.
const keywords = ['AI search engine', 'SEO'];  // Keywords to search for
const domainName = 'example.com';  // The domain you're looking for

// Run the campaign
runCampaign(searchEngine, keywords, domainName);
