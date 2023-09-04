<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

// $seller_name = $_POST["seller_name"];

$query = "select seller_id,seller_name from _sellers";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();
echo json_encode($result);
