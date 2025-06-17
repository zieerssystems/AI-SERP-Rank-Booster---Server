<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once "db.php"; // Include the updated database class

// Read JSON input
$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON, true);

// Check if JSON is valid
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON format"]);
    exit;
}

// Validate required fields
if (!isset($data['user_id'], $data['campaign_name'], $data['domain_name'], $data['keywords'], $data['search_engine'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input. Missing required fields."]);
    exit;
}

// Extract and sanitize data
$user_id = intval($data['user_id']);
$campaign_id = isset($data['campaign_id']) ? intval($data['campaign_id']) : null;
$campaign_name = $data['campaign_name'];
$domain_name = $data['domain_name'];
$keywords = $data['keywords'];
$search_engine = $data['search_engine'];

// Create DB object
$db = new serpDb();

try {
    if ($campaign_id) {
        // Update existing campaign
        $db->updateCampaign($campaign_id, $user_id, $campaign_name, $domain_name, $keywords, $search_engine);
        echo json_encode(["status" => "success", "message" => "Campaign updated successfully", "campaign_id" => $campaign_id]);
    } else {
        // Save new campaign
        $new_campaign_id = $db->saveCampaign($user_id, $campaign_name, $domain_name, $keywords, $search_engine);
        echo json_encode(["status" => "success", "message" => "Campaign created successfully", "campaign_id" => $new_campaign_id]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$db->close();
?>
