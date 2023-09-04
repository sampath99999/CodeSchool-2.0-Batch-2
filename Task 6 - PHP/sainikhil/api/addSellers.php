<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$seller_name = $_POST["seller_name"];

$query = "select seller_id from _sellers where seller_name =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$seller_name]);
$result = $stmt->fetch();
if ($result) {
    $response["status"] = false;
    $response["message"] = "Seller Already Exists";
    echo json_encode($response);
    exit;
}
$query = "insert into _sellers(seller_name) values(?);";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$seller_name]);
if ($result) {
    $response["status"] = True;
    $response["message"] = "Seller Added Successfully";
    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Problem Adding Seller";
    echo json_encode($response);
}
