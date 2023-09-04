<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
include "dbconfig.php";

$response = ["status" => false, "message" => "", "theatersList" => [], "moviesList" => []];
try {
  if (isset($_GET["userId"])) {
    $user_id = $_GET["userId"];
    $theaterQuery = "SELECT * FROM theaters WHERE user_id='$user_id'";
    $theaterStmt = $pdo->prepare($theaterQuery);
    $theaterStmt->execute();
    $theaterResult = $theaterStmt->fetchAll(PDO::FETCH_ASSOC);
    $response["theatersList"] = $theaterResult;

    $movieQuery = "SELECT * FROM movies WHERE movie_status='running'";
    $movieStmt = $pdo->prepare($movieQuery);
    $movieStmt->execute();
    $movieResult = $movieStmt->fetchAll(PDO::FETCH_ASSOC);
    $response["moviesList"] = $movieResult;
    $response["message"] = "successfull";
    $response["status"] = true;
    echo json_encode($response);
  } else {
    $response["message"] = "Please provide userId";
    echo json_encode($response);
  }
} catch (PDOException $error) {
  $response["message"] = $error->getMessage();
  echo json_encode($response);
}
