<?php
error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response=["status"=>false,"message"=>""];

if(!isset($_POST["token"])){
  $response["status"]=false;
  $response["message"]="Token is required";
  echo json_encode($response);
  exit;
}

$token=$_POST["token"];

try{
  $query="UPDATE users SET access_token='' WHERE access_token='$token'";
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