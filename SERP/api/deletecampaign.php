<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once "db.php"; // Include db.php

// Read JSON from React request
$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON, true);

if ($data === null) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input."]);
    exit;
}

// Check if campaign_id and user_id exist
if (!isset($data['campaign_id']) || !isset($data['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields.",
    ]);
    exit;
}

$campaign_id = intval($data['campaign_id']);
$user_id = intval($data['user_id']);

// Create DB instance
$db = new serpDb();

try {
    $success = $db->deleteCampaign($campaign_id, $user_id);
    if ($success) {
        echo json_encode(["status" => "success", "message" => "Campaign deleted successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to delete campaign."]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$db->close();
?>
