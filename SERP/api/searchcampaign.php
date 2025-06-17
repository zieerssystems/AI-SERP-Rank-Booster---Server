<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$api_key = "cc8212df4ea9459d3ae04e76d6cf6d0d40b6437e08fea3673ec2227b4c7fa614"; // Your API Key

$search_engine = $_GET['search_engine'] ?? 'google';
$keywords = $_GET['keywords'] ?? '';
$domain_name = $_GET['domain'] ?? '';

if (empty($keywords)) {
    echo json_encode(["error" => "Missing keywords"]);
    exit;
}

$api_url = "https://serpapi.com/search.json?engine=$search_engine&q=" . urlencode($keywords) . "&api_key=$api_key";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Disable SSL host verification
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($http_code !== 200) {
    echo json_encode(["error" => "API request failed", "http_code" => $http_code, "curl_error" => $curl_error]);
    exit;
}

$data = json_decode($response, true);
echo json_encode($data, JSON_PRETTY_PRINT);

?>
