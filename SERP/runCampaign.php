<?php
// Allow React to access this endpoint
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Read input JSON from React
$data = json_decode(file_get_contents("php://input"));

// Escape arguments for safety
$keyword = escapeshellarg($data->keyword);
$domain = escapeshellarg($data->domain);
$engine = escapeshellarg($data->engine);

// Command to run Node.js script
$command = "node C:\\wamp64\\www\\SERP\\puppeteer\\campaignRunner.js $keyword $domain $engine";
exec($command, $output, $status);

// Response back to frontend
if ($status === 0) {
    echo json_encode(["message" => "✅ Campaign started successfully."]);
} else {
    echo json_encode(["message" => "❌ Campaign failed to run."]);
}
?>
