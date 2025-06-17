<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_GET['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User ID is required"]);
    exit;
}

try {
    $user_id = intval($_GET['user_id']);
    $db = new serpDb();
    $campaigns = $db->getSavedCampaigns($user_id);
    $db->close();

    echo json_encode(["status" => "success", "campaigns" => $campaigns]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
