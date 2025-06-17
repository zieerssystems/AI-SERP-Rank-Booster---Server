<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "db.php"; // Includes serpDb class

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    $db = new serpDb(); // Create object of serpDb

    $user = $db->getUserByEmail($email);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            $user_id = $user['id'];
            $ip_address = $_SERVER['REMOTE_ADDR'];

            $db->insertLoginRecord($user_id, $email, $ip_address);

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user_id" => $user_id,
                "username" => $user['username']
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

    $db->close(); // Close DB connection
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>
