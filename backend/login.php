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

$email = $mysqli->real_escape_string($data["email"]);
$password = $data["password"];

$result = $mysqli->query("SELECT * FROM users WHERE email = '$email'");
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user["password"])) {
        echo json_encode([
            "status" => true,
            "user" => [
                "user_id" => $user["id"],
                "name" => $user["name"]
            ]
        ]);
    } else {
        echo json_encode(["status" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => false, "message" => "User not found"]);
}

$mysqli->close();
?>
