<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$product_name = $_POST["product_name"];
$price = $_POST["price"];
$inventory = $_POST["inventory"];
$description = $_POST["description"];
$seller_id = $_POST["seller_id"];
$category_id = $_POST["category_id"];

$query = "select * from _sellers where seller_id =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$seller_id]);
$sresult = $stmt->fetch();

$query = "select * from _categories where category_id =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$category_id]);
$cresult = $stmt->fetch();

if ($sresult && $cresult) {
    $query = "insert into _products(product_name,price,inventory,description,seller_id,category_id) values(?,?,?,?,?,?);";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$product_name, $price, $inventory, $description, $seller_id, $category_id]);
    if ($result) {
        $response["status"] = true;
        $response["message"] = "Added Successfully";
        echo json_encode($response);
    }
} else {
    if (!$sresult) {
        $response["status"] = false;
        $response["message"] = "Check Seller Id";
        echo json_encode($response);
        exit;
    }
    if (!$cresult) {
        $response["status"] = false;
        $response["message"] = "Check Category Id";
        echo json_encode($response);
        exit;
    }
}
