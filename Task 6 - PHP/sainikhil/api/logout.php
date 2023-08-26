<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$token = $_POST['token'];

$query = "select * from tokens where token =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);
$result = $stmt->fetch();

if ($result) {
    $query = "delete from tokens where token =?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$token]);

    if ($stmt) {
        $response["status"] = true;
        $response["message"] = "Logged Out SuccessFully";
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Error Logging Out";
    echo json_encode($response);
}
