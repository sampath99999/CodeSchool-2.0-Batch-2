<?php

error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ["status" => false, "message" => "", "data" => []];

if (!isset($_GET["theaterId"])) {
  $response["status"] = false;
  $response["message"] = "theater id required";
  echo json_encode($response);
  exit;
}

try {
  $theaterId = $_GET['theaterId'];
  $query = "SELECT m.id,m.movie_name FROM movies m LEFT JOIN movie_timing_details md ON m.id=md.movie_id WHERE md.theater_id='$theaterId' GROUP BY m.id";
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
