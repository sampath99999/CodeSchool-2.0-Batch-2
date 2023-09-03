<?php 
error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response=["status"=>false,"message"=>"","data"=>[]];

try{
  $query="SELECT id,theater_name,ticket_price FROM theaters";
  $stmt=$pdo->prepare($query);
  $stmt->execute();
  $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
  $response["status"]=true;
  $repsonse["message"]="successfull";
  $response["data"]=$result;
  echo json_encode($response);
}catch(PDOException $e){
  $response["status"]=false;
  $repsonse["message"]=$e->getMessage();
  echo json_encode($repsonse);
}