<?php
$data = json_decode(file_get_contents("php://input"), true);

$keyword = escapeshellarg($data["keyword"]);
$searchEngine = escapeshellarg($data["search_engine"]);
$targetDomain = escapeshellarg($data["target_domain"]);
$previousDomain = isset($data["previous_domain"]) ? escapeshellarg($data["previous_domain"]) : "null";

// Run Puppeteer script
$cmd = "node C:/wamp64/www/SERP/puppeteer/campaignRunner.js $keyword $searchEngine $targetDomain $previousDomain";
exec($cmd, $output, $return_var);

echo json_encode([
    "success" => $return_var === 0,
    "output" => $output
]);
?>
