<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'connect.php';
$response = ["status" => false, "message" => "", "data" => ""];
$productName=$_POST['productName'];
$reviews=$_POST['reviews'];
$mrp=$_POST['mrp'];
$sellingPrice=$_POST['sellingPrice'];
$size=$_POST['size'];
$rating=$_POST['rating'];
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["imageUploaded"]["name"]);  
move_uploaded_file($_FILES["imageUploaded"]["tmp_name"], $target_file);
$filename=basename($_FILES["imageUploaded"]["name"]);
$query = "INSERT INTO products(product_name,reviews,mrp,selling_price,image_link,product_size,rating) values(?,?,?,?,?,?,?)";
$stmt = $pdo->prepare($query);
if($stmt->execute([$productName,$reviews,$mrp,$sellingPrice,$filename,$size,$rating])){
    $response["status"]=true;
    $response["message"]="inserted successfully";
}
else{
    $response["message"]="data not inserted";
}
echo json_encode($response);