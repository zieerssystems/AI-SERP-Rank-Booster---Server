
<?php
// Get JSON POST data
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

$keyword = escapeshellarg($data['keyword']);
$domain = escapeshellarg($data['domain_name']);
$searchEngine = escapeshellarg($data['search_engine']);

// Command to run the Puppeteer script (Node.js)
$command = "node C:/wamp64/www/SERP/puppeteer/campaignRunner.js $keyword $domain $searchEngine";

// Execute the Puppeteer script
$output = shell_exec($command);

// Return response to frontend
echo json_encode([
    "status" => "success",
    "message" => "Puppeteer script triggered.",
    "output" => $output
]);
?>
