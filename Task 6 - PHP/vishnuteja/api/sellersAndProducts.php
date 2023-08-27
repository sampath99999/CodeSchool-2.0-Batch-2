<?php

error_reporting(E_ALL);
ini_set('display_errors','1');
include 'dbconfig.php';

$response = ["status"=>false,"message"=>"","data"=>""];

$query = "select * from seller_product_mapping";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if($result){

$response['status'] = true;
$response['message'] = "successfully fetched all orders";

foreach ($result as $row) {
    $response["sellerId"][] = $row["seller_id"];
    $response["sellerName"][] = $row["seller_name"];
    $response["productId"][] = $row["product_id"];
    $response["productName"][] = $row["product_name"];
    $response["Items_In_Inventory"][] = $row["items_in_inventory"];
}

 echo json_encode($response);
  exit;

}else{
  $response['status'] = false;
  $response['message']="failed to fetch orders";
  echo json_encode($response);
  exit;
}
