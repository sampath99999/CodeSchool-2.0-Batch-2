<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$sellerIds = $_POST['sellerIds'];
// echo json_encode($sellerIds);
$count = 1;
// $sellerIds = json_decode($sellerIds);
// echo gettype($sellerIds);
// echo count($sellerIds);

foreach ($sellerIds as $sellerid) {
    $query = "delete from _sellers where seller_id = ?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$sellerid]);
    $count = +1;
}
echo $count;
if ($count == count($sellerIds)) {
    $response["status"] = True;

    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Error Deleting Seller";
    echo json_encode($response);
}
