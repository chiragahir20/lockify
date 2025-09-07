<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

$conn = new mysqli("localhost", "root", "", "lockify_db");
if ($conn->connect_error) {
    echo json_encode(["status" => false, "message" => "DB connection failed"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

if (
    !isset($input['user_id']) || 
    !isset($input['wid']) || 
    !isset($input['website_name']) || 
    !isset($input['username']) || 
    !isset($input['password'])
) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit();
}

$user_id = (int)$input['user_id'];
$wid = (int)$input['wid'];
$website_name = $conn->real_escape_string(trim($input['website_name']));
$username = $conn->real_escape_string(trim($input['username']));
$password = $conn->real_escape_string(trim($input['password']));

$encryptedPassword = openssl_encrypt($password, "AES-256-CBC", ENCRYPTION_KEY, 0, ENCRYPTION_IV);

$stmt = $conn->prepare("UPDATE websites SET website_name = ?, username = ?, password = ? WHERE id = ? AND user_id = ?");
$stmt->bind_param("sssii", $website_name, $username, $encryptedPassword, $wid, $user_id);

if ($stmt->execute()) {
    echo json_encode(["status" => true, "message" => "Website updated successfully"]);
} else {
    echo json_encode(["status" => false, "message" => "Failed to update website"]);
}

$stmt->close();
$conn->close();
