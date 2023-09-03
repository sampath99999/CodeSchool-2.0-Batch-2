<?php 
error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response=["status"=>false,"message"=>"","data"=>[]];

if (!isset($_GET["theaterId"])) {
  $response["status"] = false;
  $response["message"] = "theater id required";
  echo json_encode($response);
  exit;
}

try{
  $theaterId=$_GET["theaterId"];
  $query="SELECT ticket_price FROM theaters where id='$theaterId'";
  $stmt=$pdo->prepare($query);
  $stmt->execute();
  $result=$stmt->fetch(PDO::FETCH_ASSOC);
  $response["status"]=true;
  $repsonse["message"]="successfull";
  $response["data"]=$result;
  echo json_encode($response);
}catch(PDOException $e){
  $response["status"]=false;
  $repsonse["message"]=$e->getMessage();
  echo json_encode($repsonse);
}