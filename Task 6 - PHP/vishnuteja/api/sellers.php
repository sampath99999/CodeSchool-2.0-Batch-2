<?php

error_reporting(E_ALL);
ini_set("display_error","1");
include "dbconfig.php";

$response = ["status"=>false,"message"=>""];

$query = "select * from sellers";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);


if($result){

    foreach ($result as $row) {
        $response['sellerId'][] = $row['seller_id'];
        $response['sellerName'][] = $row['seller_name'];
        $response['productId'][] = $row['product_id'];
    }

    $response['status'] = true;
    $response['message'] = "successfully fetched sellers details";
    echo json_encode($response);
    exit;
}else{
    $response['status'] = false;
    $response['message'] = "failed to fetch sellers data";
    echo json_encode($response);
    exit;
}