<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "message" => "","data"=>""];
try{
$query="select * from donations";
$stmt = $pdo->prepare($query);
$result = $stmt->execute();
if($result){
$data=$stmt->fetchAll(PDO::FETCH_ASSOC);
$response['status']=true;
$response['data']=$data;
echo json_encode($response);
}
}
catch(\EXCEPTION $e){
$response['message']="Database error:".$e;
echo json_encode($response);
}