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

if(!isset($_POST['productPrice'])){
    $response['status'] = "false";
    $response['message'] = "Product Price is not given";
    echo json_encode($response);
    exit;
}

$productId = $_POST['productId'];
$productName = $_POST['productName'];
$productPrice = $_POST['productPrice'];
$numberOfItems = $_POST['numOfProducts'];

$existingData = $pdo->prepare("select * from products where product_id = :product_id");
$existingData -> bindParam(':product_id',$productId,PDO::PARAM_STR);
$existingData->execute();
$count = $existingData->fetchColumn();

  if($count > 0){
    $response['status'] = false;
    $response['message']='Product ID already exists, please enter unique product Id!';
    echo json_encode($response);
    exit;
  }else
  {

      $query = "insert into
      products (
        product_id,
        product_name,
        items_in_inventory,
        price,
        created_at
      )
      VALUES (
        :product_id,
        :product_name,
        :items_in_inventory,
        :price,
        current_timestamp
      )" ;

        $stmt = $pdo-> prepare($query);
        $stmt->bindParam(':product_id',$productId,PDO::PARAM_STR);
        $stmt->bindParam(':product_name',$productName,PDO::PARAM_STR);
        $stmt->bindParam(':price',$productPrice,PDO::PARAM_STR);
        $stmt->bindParam(':items_in_inventory',$numberOfItems,PDO::PARAM_STR);

        $stmt->execute();

        $response['status'] = true;
        $response['message'] = "Product added successfully.";
        echo json_encode($response);
   }
} catch (Exception $e) {
$response['message'] = "Error: " . $e->getMessage();
echo json_encode($response);
}
