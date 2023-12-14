<?php


error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response=  ["status"=>false,"message"=>"","data"=>""];
$userId = $_POST['token'];


$query = "select * from employeesregistration where token =?";
$stmt = $pdo->prepare($query);
 $stmt->execute([$userId]);
 $result = $stmt->fetch(PDO::FETCH_ASSOC);

if($result && $result['id']){

    $response['status'] = true;
    $response['message'] = "Welcome ".$result['firstname']; 
    echo json_encode($response);
    exit;
}else{
    $response['status'] = false;
    $response['message'] = "User Not Authenticated"; 
    echo json_encode($response);
    exit;
}