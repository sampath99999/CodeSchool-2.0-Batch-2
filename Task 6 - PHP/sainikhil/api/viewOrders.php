<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');


$query = "select  order_id,customer_id, order_date, promised_delivery_date,product_id from orders;";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo json_encode($result);
