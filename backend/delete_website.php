<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "lockify_db");
if ($conn->connect_error) {
    echo json_encode(["status" => false, "message" => "DB connection failed"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['user_id']) || !isset($input['wid'])) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit();
}

$user_id = (int)$input['user_id'];
$wid = (int)$input['wid'];

$stmt = $conn->prepare("DELETE FROM websites WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $wid, $user_id);
$exec = $stmt->execute();

if ($exec) {
    echo json_encode(["status" => true, "message" => "Website deleted successfully"]);
} else {
    echo json_encode(["status" => false, "message" => "Failed to delete website"]);
}

$stmt->close();
$conn->close();
