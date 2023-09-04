<?php

error_reporting(E_ALL);
ini_set('display_errors', "1");
include "dbconfig.php";

$response = ['status' => false, 'message' => "", 'data' => []];

if (!isset($_GET["tablename"])) {
  $response["status"] = false;
  $response["message"] = "Tablename is required";
  echo json_encode($response);
  exit;
}

if (!isset($_GET["userId"])) {
  $response["status"] = false;
  $response["message"] = "User id is required";
  echo json_encode($response);
  exit;
}

try {
  $tablename = $_GET["tablename"];
  $userId = $_GET["userId"];
  if ($_GET["tablename"] === "bookings") {
    $query = "SELECT b.id AS \"booking id\" , u.firstname ||' '|| u.lastname  AS \"customer name\",m.movie_img_url ,t.theater_name AS \"theater name\",t.location AS \"theater location\",t.ticket_price AS \"ticket price\",m.movie_name AS \"movie name\", b.no_of_seats AS quantity , b.total_amount AS \"total price\",md.show_date_time AS \"show date time\", to_char(b.booking_date_time,'dd-mm-yyyy HH12:MI AM') AS \"booking date time\" FROM bookings b LEFT JOIN movie_timing_details md ON b.movie_timing_detail_id=md.id LEFT JOIN users u ON b.customer_id = u.id LEFT JOIN theaters t ON md.theater_id =t.id LEFT JOIN movies m on md.movie_id=m.id WHERE t.user_id='$userId' ORDER BY md.show_date_time";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
    $response["message"] = "Data retrived successfull";
    $response["data"] = $result;
    echo json_encode($response);
  } else if ($_GET["tablename"] === "theaters") {
    $query = "SELECT t.theater_name AS Name,t.founded,t.location,m.movie_name AS \"Movie name\",to_char(md.show_date_time,'dd-mm-yyyy HH12:MI AM') AS \"show date time\",SUM(b.no_of_seats) AS \"No of seats occupied\",t.seating_capacity AS \"Seating capacity\" FROM theaters t LEFT JOIN movie_timing_details md ON t.id=md.theater_id LEFT JOIN bookings b ON md.id=b.movie_timing_detail_id LEFT JOIN movies m ON m.id=md.movie_id WHERE t.user_id='$userId' GROUP BY t.theater_name,t.founded,t.location,m.movie_name,t.seating_capacity,md.show_date_time ORDER BY t.theater_name";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
    $response["message"] = "Data retrived successfull";
    $response["data"] = $result;
    echo json_encode($response);
  } else if ($_GET["tablename"] === "users") {
    $query = "SELECT firstname || ' ' || lastname AS name,email As email,status As active_status FROM users";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
    $response["message"] = "Data retrived successfull";
    $response["data"] = $result;
    echo json_encode($response);
  } else if ($_GET["tablename"] === "movies") {
    $query = "SELECT m.movie_name AS name,to_char(released_date,'dd-mm-yyyy') AS \"released date\" FROM movies m LEFT JOIN movie_timing_details md on m.id=md.movie_id LEFT JOIN theaters t ON t.id=md.theater_id WHERE t.user_id='$userId' GROUP BY m.movie_name,m.released_date ORDER BY m.movie_name";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
    $response["message"] = "Data retrived successfull";
    $response["data"] = $result;
    echo json_encode($response);
  }
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}
