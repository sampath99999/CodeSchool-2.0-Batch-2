<?php

error_reporting(E_ALL);
ini_set('display_errors', "1");
include "dbconfig.php";

$response = ['status' => false, 'message' => "", 'data' => []];

try {
  if (isset($_GET["tablename"])) {
    $tablename = $_GET["tablename"];
    if ($_GET["tablename"] === "bookings") {
      $query = 'SELECT b.id, c.customer_name, t.theater_name,m.movie_name,b.seat_numbers,b.show_date_time,b.booking_date_time FROM customers c LEFT JOIN bookings b ON c.id=b.customer_id LEFT JOIN theaters t ON b.theater_id=t.id LEFT JOIN movies m ON b.movie_id=m.id';
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $response["status"] = true;
      $response["message"] = "Data retrived successfull";
      $response["data"] = $result;
      echo json_encode($response);
    } else {
      $query = 'SELECT * FROM ' . $tablename;
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $response["status"] = true;
      $response["message"] = "Data retrived successfull";
      $response["data"] = $result;
      echo json_encode($response);
    }
  } else {
    $response["status"] = false;
    $response["message"] = "Table name not provided";
    echo json_encode($response);
  }
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}
