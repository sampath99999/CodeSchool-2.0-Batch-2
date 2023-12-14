<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';
$response = ["status" => false, "message" => ""];
if (!isset($_POST['token'])) {

    $response['status'] = false;
    $response['message'] = "Token is not present";
    echo json_encode($response);
    exit;
}
$token = ($_POST['token']);
try{
$query = "delete from tokens where token=?";
$stmt = $pdo->prepare($query);
if ($stmt->execute([$token])) {
    echo "successfully logged out";
    echo json_encode($response);
}
}
catch(\EXCEPTION $e){
$response['message']="Database Error:".$e;
echo json_encode($response);
}
?>