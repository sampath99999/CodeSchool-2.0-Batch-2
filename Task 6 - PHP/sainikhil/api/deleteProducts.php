<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$productIds = $_POST['productIds'];
// echo json_encode($productIds);
$count = 1;
// $productIds = json_decode($productIds);
// echo gettype($productIds);
// echo count($sellerIds);

foreach ($productIds as $productId) {
    $query = "delete from _products where product_id = ?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$productId]);
    $count = +1;
}
// echo $count;
if ($count == count($productIds)) {
    $response["status"] = True;

    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Error Deleting Seller";
    echo json_encode($response);
}
