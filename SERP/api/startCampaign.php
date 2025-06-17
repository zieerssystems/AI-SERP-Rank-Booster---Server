<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $searchEngine = $_POST['search_engine'];
    $keywords = $_POST['keywords'];
    $domainName = $_POST['domain_name'];

    $command = "node ../puppeteer/searchAutomation.js " . escapeshellarg($searchEngine) . " " . escapeshellarg($keywords) . " " . escapeshellarg($domainName);

    exec($command . " 2>&1", $output, $result_code);

    if ($result_code === 0) {
        echo json_encode(["status" => "success", "message" => "Campaign started"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error running script", "details" => $output]);
    }
}
?>
