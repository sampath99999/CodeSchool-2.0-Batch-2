<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';

$token = $_POST["token"];

$logoutQuery = "UPDATE users SET active_status = ? WHERE token = ?";
$stmt = $pdo->prepare($logoutQuery);
$stmt->execute([0, $token]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($result);
?>