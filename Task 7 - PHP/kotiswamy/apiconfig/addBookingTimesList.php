<?php
error_reporting(E_ALL);
ini_set("display_errors","1");
include "dbconfig.php";

$repsonse=["status"=>false,"message"=>"","data"=>[]];

if(!isset($_GET["theaterId"])){
  $response["status"] = false;
  $response["message"] = "Theater id required";
  echo json_encode($response);
  exit;
}

if(!isset($_GET["movieId"])){
  $response["status"] = false;
  $response["message"] = "Movie id required";
  echo json_encode($response);
  exit;
}

if(!isset($_GET["date"])){
  $response["status"] = false;
  $response["message"] = "Movie show date required";
  echo json_encode($response);
  exit;
}

try{
  $theaterId=$_GET["theaterId"];
  $movieId=$_GET["movieId"];
  $date=$_GET["date"];
  $query="SELECT show_date_time AS time FROM movie_timing_details WHERE theater_id='$theaterId' AND movie_id='$movieId' AND CAST(show_date_time AS date)='$date'";
  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $response["status"] = true;
  $response["message"] = "Successfull";
  $response["data"] = $result;
  echo json_encode($response);
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}


