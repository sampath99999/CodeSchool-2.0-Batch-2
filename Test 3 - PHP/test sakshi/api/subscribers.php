<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$emails = [];

$query = "SELECT email, status FROM user_data";
$stmt = $db->prepare($query);
$stmt->execute();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $emails[] = [
        'email' => $row["email"],
        'status' => $row["status"]
    ];
}

header('Content-Type: application/json');
echo json_encode(['emails' => $emails]);
