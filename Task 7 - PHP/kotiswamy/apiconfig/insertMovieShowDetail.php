<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ["status" => false, "message" => ""];

if (!isset($_POST["theaterId"])) {
  $response["status"] = false;
  $response["message"] = "Theater id is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["movieId"])) {
  $response["status"] = false;
  $response["message"] = "Movie id is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["showDateTime"])) {
  $response["status"] = false;
  $response["message"] = "Show date-time is required";
  echo json_encode($response);
  exit;
}

$theaterId = $_POST["theaterId"];
$movieId = $_POST["movieId"];
$showDateTime = $_POST["showDateTime"];

$convertedDate = str_replace("T", " ", $showDateTime);
$convertedDate = $convertedDate . ':00';

try {
  $query = "SELECT * FROM movies WHERE id='$movieId'";
  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($showDateTime >= $result["released_date"]) {
    try {
      $query = "INSERT INTO movie_timing_details(theater_id,movie_id,show_date_time) VALUES('$theaterId','$movieId','$showDateTime')";
      $stmt = $pdo->prepare($query);
      $result = $stmt->execute();
      $response["status"] = true;
      $response["message"] = "Show added";
      echo json_encode($response);
    } catch (PDOException $e) {
      $response["status"] = false;
      $response["message"] = $e->getMessage();
      echo json_encode($response);
    }
  } else {
    $response["status"] = false;
    $response["message"] = "show time should be greaterthan or equal to " .$result["released_date"];
    echo json_encode($response);
  }
} catch (PDOException $e) {
  $query = "SELECT * FROM movies WHERE id='$movieId'";
  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
  exit;
}
