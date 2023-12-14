<?php

error_reporting(E_ALL);
ini_set('display_errors','1');
include 'dbconfig.php';

$response = ["status"=>false,"message"=>""];

$query = "select * from  products";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);


foreach ($result as $row) {
    $response["productId"][] = $row['product_id'];
    $response["productName"][] = $row['product_name'];
    $response["NumberOfItems"][] = $row['items_in_inventory'];
    $response["price"][] = $row['price'];
}



if($result){
    $response["status"]=true;
    $response["message"]="succesfully fetched product details";
    $jsonResponse = json_encode($response);
    echo $jsonResponse;
    exit;
}else{
    $response["status"]=false;
    $response["message"]="failed to fetch data";
    $jsonResponse = json_encode($response);
    echo $jsonResponse;
    exit; 
}

