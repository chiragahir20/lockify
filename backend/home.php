<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

$mysqli = new mysqli("localhost", "root", "", "lockify_db");

if ($mysqli->connect_errno) {
    echo json_encode(["status" => false, "message" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data["user_id"] ?? null;

if (!$user_id) {
    echo json_encode(["status" => false, "message" => "User ID is required"]);
    exit();
}

$query = $mysqli->prepare("SELECT id as web_id, website_name as web_name, user_id as reg_id FROM websites WHERE user_id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();

$websites = [];
while ($row = $result->fetch_assoc()) {
    $websites[] = $row;
}

if (count($websites) > 0) {
    echo json_encode(["status" => true, "websites" => $websites]);
} else {
    echo json_encode(["status" => false, "message" => "No records found"]);
}

$query->close();
$mysqli->close();
?>
