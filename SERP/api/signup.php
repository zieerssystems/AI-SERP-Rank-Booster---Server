<?php
include 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

try {
    $db = new serpDb();

    if ($db->getUserByEmail($email)) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
    } else {
        $userId = $db->registerUser($name, $email, $password);
        if ($userId) {
            echo json_encode(["success" => true, "message" => "Registration successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Registration failed"]);
        }
    }

    $db->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
