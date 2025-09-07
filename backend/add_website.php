<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

$mysqli = new mysqli("localhost", "root", "", "lockify_db");

if ($mysqli->connect_errno) {
    echo json_encode(["status" => false, "message" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $mysqli->real_escape_string($data["id"]);
$website_name = $mysqli->real_escape_string($data["websiteName"]);
$username = $mysqli->real_escape_string($data["username"]);
$password = $mysqli->real_escape_string($data["password"]); 

$encryptedPassword = openssl_encrypt($password, "AES-256-CBC", ENCRYPTION_KEY, 0, ENCRYPTION_IV);

$sql = "INSERT INTO websites (user_id, website_name, username, password) 
        VALUES ('$user_id', '$website_name', '$username', '$encryptedPassword')";

if ($mysqli->query($sql)) {
    echo json_encode(["status" => true]);
} else {
    echo json_encode(["status" => false, "message" => $mysqli->error]);
}

$mysqli->close();
?>






