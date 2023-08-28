<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];



$query = "select category_name,category_id from _categories";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();
echo json_encode($result);
