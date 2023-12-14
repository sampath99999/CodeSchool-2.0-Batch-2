<?php

error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response = ["status"=>false,"message"=>"","data"=>""];


if(isset($_POST['products']) && is_array($_POST['products'])){

    foreach ($_POST['products'] as $productId) {
        $stmt = $pdo->prepare("delete from products where product_id = :productId");
        $stmt->bindParam(':productId',$productId,PDO::PARAM_STR);
        $stmt->execute();
    }
    
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

    $response['status'] = true;
    $response['message'] = "Selected Products removed successfully!";
    echo json_encode($response);
}else{
    $response['status'] = false;
    $response['message'] = "Invalid request!";
    echo json_encode($response);
}