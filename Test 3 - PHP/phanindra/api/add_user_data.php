

<?php

error_reporting(E_ALL);
ini_set("display_errors", "1");
include "db_config.php";


$response = ["status" => false, "message" => "", "data" => []];



if (!isset($_POST['productImage'])) {
    $response['status'] = false;
    $response['status'] = "ProductImage is not present";
    exit;
}

if (!isset($_POST['productName'])) {
    $response['status'] = false;
    $response['status'] = "ProductName is not present";
    exit;
}

if (!isset($_POST['category'])) {
    $response['status'] = false;
    $response['message'] = "Category is not present";
    exit;
}

if (!isset($_POST['sku'])) {
    $response['status'] = false;
    $response['message'] = "SKU is not present";
    exit;
}

if (!isset($_POST['price'])) {
    $response['status'] = false;
    $response['message'] = "Price is not present";
    exit;
}


if (!isset($_POST['variant'])) {
    $respose['status'] = false;
    $respose['status'] = "Variant is not present";
    exit;
}



$productImage = $_POST['productImage'];
$productName = $_POST['productName'];
$category = $_POST['category'];
$sku = $_POST['sku'];
$price = $_POST['price'];
$variant = $_POST['variant'];

$productId = rand();


$query = "INSERT INTO products(id,productImage, productName, category, sku, price, variant) VALUES (?, ?, ?, ?, ?, ?,?)";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$productId, $productImage, $productName, $category, $sku, $price, $variant]);

if ($result) {
    $response['status'] = true;
    $response['id'] = $productId;
    $response['message'] = "Product Added Successfully";
} else {
    $response['message'] = "Failed to add Product";
}

echo json_encode($response);
