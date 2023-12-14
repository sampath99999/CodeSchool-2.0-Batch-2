<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'connect.php';
$response = [];
$query = "select * from products";
$stmt = $pdo->prepare($query);
$stmt->execute();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $response[]=$row;
}

echo json_encode($response);