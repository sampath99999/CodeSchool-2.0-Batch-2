<?php
error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$response=["status"=>false,"message"=>"","data"=>[]];


if(!isset($_GET["movieId"])){
  $response["status"]=false;
  $response["message"]="Movie id is required";
  echo json_encode($response);
  exit;
}

if(!isset($_GET["theaterId"])){
  $response["status"]=false;
  $response["message"]="Theater id is required";
  echo json_encode($response);
  exit;
}

try{
  $movieId=$_GET["movieId"];
  $theaterId=$_GET["theaterId"];
  $query="SELECT DISTINCT cast(show_date_time AS date) FROM movie_timing_details WHERE theater_id='$theaterId' AND movie_id='$movieId'";
  $stmt=$pdo->prepare($query);
  $stmt->execute();
  $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
  $response["status"]=true;
  $response["message"]="Success";
  $response["data"]=$result;
  echo json_encode($response);
}catch(PDOException $e){
  $response["status"]=false;
  $response["message"]=$e->getMessage();
  echo json_encode($response);
}


