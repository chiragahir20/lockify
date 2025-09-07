<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");  // Adjust in production for security
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// DB connection
$conn = new mysqli("localhost", "root", "", "lockify_db");

if ($conn->connect_error) {
    echo json_encode(["status" => false, "message" => "Database connection failed"]);
    exit();
}

// Get POST data
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['password']) || !isset($input['user_id'])) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit();
}

$password = $input['password'];  // raw password from React
$user_id = (int)$input['user_id'];

// Fetch hashed profile password from DB
$sql = "SELECT profile_password FROM users WHERE id = $user_id LIMIT 1";
$result = $conn->query($sql);

if (!$result || $result->num_rows === 0) {
    echo json_encode(["status" => false, "message" => "User not found"]);
    exit();
}

$row = $result->fetch_assoc();
$hashedPassword = $row['profile_password'];

// Verify password with hash
if (password_verify($password, $hashedPassword)) {
    echo json_encode(["status" => true]);
} else {
    echo json_encode(["status" => false, "message" => "Invalid password"]);
}

$conn->close();
