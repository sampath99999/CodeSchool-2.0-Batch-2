<?php

error_reporting(E_ALL);
ini_set("display_errors","1");
include 'dbconfig.php';

$response = ["status"=>false,"message"=>"","data"=>""];

$query = "select * from orders";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if($result){

$response['status'] = true;
$response['message'] = "successfully fetched all orders";

foreach ($result as $row) {
    $response["orderId"][] = $row["order_id"];
    $response["userId"][] = $row["user_id"];
    $response["cardId"][] = $row["card_id"];
    $response["productId"][] = $row["product_id"];
    $response["orderTime"][] = $row["order_time"];
    $response["orderDate"][] = $row["order_date"];
    $response["deliveryTime"][] = $row["delivery_time"];
    $response["deliveryDate"][] = $row["delivery_date"];
}

 echo json_encode($response);
  exit;

}else{
  $response['status'] = false;
  $response['message']="failed to fetch orders";
  echo json_encode($response);
  exit;
}