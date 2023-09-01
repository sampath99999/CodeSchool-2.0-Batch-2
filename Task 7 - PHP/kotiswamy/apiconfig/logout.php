<?php
error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response=["status"=>false,"message"=>""];

if(!isset($_POST["userId"])){
  $response["status"]=false;
  $response["message"]="User id required";
  echo json_encode($response);
  exit;
}

try{
  $query="UPDATE users SET status='logout',access_token=''";
  $stmt=$pdo->query($query);
  $result=$stmt->execute();
  $response["status"]=true;
  $response["message"]="Logout successfull";
  echo json_encode($response);
}catch(PDOException $e){
  $response["status"]=false;
  $response["message"]=$e->getMessage();
  echo json_encode($response);
}