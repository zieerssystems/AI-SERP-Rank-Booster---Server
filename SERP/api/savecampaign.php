<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "db.php";

// Get the JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are provided
if (!isset($data['user_id'], $data['campaign_name'], $data['domain_name'], $data['keywords'], $data['search_engine'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$user_id = intval($data['user_id']);
$campaign_name = $conn->real_escape_string($data['campaign_name']);
$domain_name = $conn->real_escape_string($data['domain_name']);
$keywords = $conn->real_escape_string($data['keywords']);
$search_engine = $conn->real_escape_string($data['search_engine']);

// Insert campaign into saved_campaigns table
$sql = "INSERT INTO saved_campaigns (user_id, campaign_name, domain_name, keywords, search_engine) 
        VALUES ('$user_id', '$campaign_name', '$domain_name', '$keywords', '$search_engine')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Campaign saved successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>
