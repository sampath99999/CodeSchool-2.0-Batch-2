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

if (!isset($_POST["date"])) {
  $response["status"] = false;
  $response["message"] = "date is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["quantity"])) {
  $response["status"] = false;
  $response["message"] = "Quantity is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["totalPrice"])) {
  $response["status"] = false;
  $response["message"] = "Total price  is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["userId"])) {
  $response["status"] = false;
  $response["message"] = "User id  is required";
  echo json_encode($response);
  exit;
}

$theaterId = $_POST["theaterId"];
$movieId = $_POST["movieId"];
$date = $_POST["date"];
$quantity = $_POST["quantity"];
$totalPrice = $_POST["totalPrice"];
$userId = $_POST["userId"];

try {
  $selectQuery = "SELECT id FROM movie_timing_details WHERE theater_id='$theaterId' AND movie_id='$movieId' AND  show_date_time='$date'";
  $selectStmt = $pdo->prepare($selectQuery);
  $selectStmt->execute();
  $selectResult = $selectStmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
  exit;
}

try {
  $seatingQuery = "SELECT t.id,t.seating_capacity,SUM(b.no_of_seats) AS quantity FROM theaters t LEFT JOIN movie_timing_details md ON t.id = md.theater_id LEFT JOIN bookings b ON b. movie_timing_detail_id=md.id WHERE t.id='$theaterId' GROUP BY t.id";
  $seatingStmt = $pdo->prepare($seatingQuery);
  $seatingStmt->execute();
  $seatingResult = $seatingStmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
  exit;
}



$movieDetailId = $selectResult["id"];
$remaningSeats = $seatingResult["seating_capacity"] - $seatingResult["quantity"];
if ($quantity <= $remaningSeats) {
  try {
    $query = "INSERT INTO bookings(customer_id, movie_timing_detail_id,no_of_seats,total_amount) VALUES('$userId','$movieDetailId','$quantity','$totalPrice')";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute();
    $response["status"] = true;
    $response["message"] = "successfull";
    echo json_encode($response);
  } catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
  }
} else {
  $response["status"] = false;
  $response["message"] = "Seats left '$remaningSeats'";
  echo json_encode($response);
}
