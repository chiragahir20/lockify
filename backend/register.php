<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$mysqli = new mysqli("localhost", "root", "", "lockify_db");
if ($mysqli->connect_errno) {
    echo json_encode(["status" => false, "message" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$name = $mysqli->real_escape_string($data["name"]);
$email = $mysqli->real_escape_string($data["email"]);
$contact = $mysqli->real_escape_string($data["contact"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT);
$profilePassword = password_hash($data["profilePassword"], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, email, contact, password, profile_password)
        VALUES ('$name', '$email', '$contact', '$password', '$profilePassword')";

if ($mysqli->query($sql)) {
    echo json_encode(["status" => true]);
} else {
    echo json_encode(["status" => false]);
}

$mysqli->close();
?>
