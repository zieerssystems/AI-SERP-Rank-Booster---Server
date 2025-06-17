<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow CORS and JSON input
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "db.php"; // Include your serpDb class

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || empty($data['email'])) {
    echo json_encode(["status" => "error", "message" => "Email is required"]);
    exit;
}

$email = trim($data['email']);

// Step 1: Check if user exists in DB
$db = new serpDb();
$user = $db->getUserByEmail($email);
if (!$user) {
    echo json_encode(["status" => "error", "message" => "Email not found"]);
    exit;
}

// Step 2: Generate new random password
$newPassword = substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"), 0, 8);
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Step 3: Update password in database
$updated = $db->updatePasswordByEmail($email, $hashedPassword);
if (!$updated) {
    echo json_encode(["status" => "error", "message" => "Failed to update password in database"]);
    exit;
}

// Step 4: Send new password via Brevo API
$apiKey = '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';
$senderEmail = 'aryathulicheri@gmail.com';
$senderName = 'AI SERP RANK BOOSTER';

$payload = [
    "sender" => [
        "name" => $senderName,
        "email" => $senderEmail
    ],
    "to" => [
        ["email" => $email]
    ],
    "subject" => "Your New Password - AI SERP Rank Booster",
    "htmlContent" => "<html><body>
        <p>Hello,</p>
        <p>Your new password is: <strong>$newPassword</strong></p>
        <p>Please log in and change your password immediately.</p>
        <p>Regards,<br>AI SERP Rank Booster Team</p>
    </body></html>"
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.brevo.com/v3/smtp/email");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "accept: application/json",
    "api-key: $apiKey",
    "content-type: application/json"
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Final response to frontend
if ($curlError) {
    echo json_encode(["status" => "error", "message" => "cURL Error: $curlError"]);
} elseif ($httpCode === 201) {
    echo json_encode(["status" => "success", "message" => "New password sent to email."]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Brevo API failed",
        "http_code" => $httpCode,
        "response" => $response
    ]);
}
?>
