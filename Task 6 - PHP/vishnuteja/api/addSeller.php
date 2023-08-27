<?php

error_reporting(E_ALL);
ini_set('display_errors','1');
include 'dbconfig.php';

$response = ["status"=>false ,"message"=>'', "data"=>''];

try{
if(!isset($_POST['productId'])){
    $response['status'] = "false";
    $response['message'] = "Product ID is not given";
    echo json_encode($response);
    exit;
}

if(!isset($_POST['sellerId'])){
    $response['status'] = "false";
    $response['message'] = "Seller Id is not given";
    echo json_encode($response);
    exit;
}

if(!isset($_POST['sellerName'])){
    $response['status'] = "false";
    $response['message'] = "Seller Name is not given";
    echo json_encode($response);
    exit;
}

$productId = $_POST['productId'];
$sellerName = $_POST['sellerName'];
$sellerId = $_POST['sellerId'];

$existingData = $pdo->prepare("select * from sellers where seller_id = :seller_id");
$existingData -> bindParam(':seller_id',$sellerId,PDO::PARAM_STR);
$existingData->execute();
$count = $existingData->fetchColumn();

  if($count > 0){
    $response['status'] = false;
    $response['message']='Seller ID already exists, please enter unique seller Id!';
    echo json_encode($response);
    exit;
  }else
  {

      $query = "insert into
      sellers (
        seller_id,
        seller_name,
        product_id
      )
      VALUES (
        :seller_id,
        :seller_name,
        :product_id
      )" ;

        $stmt = $pdo-> prepare($query);
        $stmt->bindParam(':product_id',$productId,PDO::PARAM_STR);
        $stmt->bindParam(':seller_name',$sellerName,PDO::PARAM_STR);
        $stmt->bindParam(':seller_id',$sellerId,PDO::PARAM_STR);

        $stmt->execute();

        $response['status'] = true;
        $response['message'] = "Seller added successfully.";
        echo json_encode($response);
   }
} catch (Exception $e) {
$response['message'] = "Error: " . $e->getMessage();
echo json_encode($response);
}
