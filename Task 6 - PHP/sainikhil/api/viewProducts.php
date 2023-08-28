<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');


$query = "select  product_id,product_name, price, inventory,description,seller_id,category_id from _products;";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo json_encode($result);
