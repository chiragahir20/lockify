<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

$conn = new mysqli("localhost", "root", "", "lockify_db");

if ($conn->connect_error) {
    echo json_encode(["status" => false, "message" => "Database connection failed"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['user_id']) || !isset($input['wid'])) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit();
}

$user_id = (int)$input['user_id'];
$wid = (int)$input['wid'];

// Secure query to fetch website details for given user and website id
$stmt = $conn->prepare("SELECT website_name, username, password FROM websites WHERE id = ? AND user_id = ? LIMIT 1");
$stmt->bind_param("ii", $wid, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $website = $result->fetch_assoc();

     $website['password'] = openssl_decrypt($website['password'], "AES-256-CBC", ENCRYPTION_KEY, 0, ENCRYPTION_IV);

    echo json_encode(["status" => true, "website" => $website]);
} else {
    echo json_encode(["status" => false, "message" => "Website details not found"]);
}

$stmt->close();
$conn->close();
