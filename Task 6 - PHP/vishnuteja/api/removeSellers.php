<?php

error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response = ["status"=>false,"message"=>"","data"=>""];


if(isset($_POST['sellers']) && is_array($_POST['sellers'])){

    foreach ($_POST['sellers'] as $sellerId) {
        $stmt = $pdo->prepare("delete from sellers where seller_id = :sellerId");
        $stmt->bindParam(':sellerId',$sellerId,PDO::PARAM_STR);
        $stmt->execute();
    }
    
$query = "select * from  sellers";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);


foreach ($result as $row) {
    $response["sellerId"][] = $row['seller_id'];
    $response["sellerName"][] = $row['seller_name'];
    $response["productId"][] = $row['product_id'];
}

    $response['status'] = true;
    $response['message'] = "Selected Sellers removed successfully!";
    echo json_encode($response);
}else{
    $response['status'] = false;
    $response['message'] = "Invalid request!";
    echo json_encode($response);
}