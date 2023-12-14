<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "message" => ""];
if (!isset($_POST['amount'])) {

    $response['status'] = false;
    $response['message'] = "amount is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['cause'])) {

    $response['status'] = false;
    $response['message'] = "cause is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['gift'])) {

    $response['status'] = false;
    $response['message'] = "dedicate gift to is required";
    echo json_encode($response);
    exit;
}
$amount=$_POST['amount'];
$cause=$_POST['cause'];
$gift=$_POST['gift'];
try{
$query="insert into donations(amount,cause,gift_to) values(?,?,?)";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$amount, $cause,$gift]);
    if ($result) {
        $response['status'] = true;
        $response['message'] = "Donated successfully";
        echo json_encode($response);
        exit;
    }
}
catch(\Exception $e){
     $response["message"]="Database error:".$e;
     echo json_encode($response);
}
