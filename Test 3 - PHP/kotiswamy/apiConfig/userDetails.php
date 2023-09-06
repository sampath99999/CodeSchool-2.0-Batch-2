<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', '1');
ini_set("error_log", "error.log");
require_once 'dbConfig.php';

$response = ["status" => false, "message" => "", "data" => []];

if (!isset($_GET["token"])) {
  $response["message"] = "Token is Required";
  echo json_encode($response);
  exit;
}

$token = $_GET["token"];

try {
  $query = "SELECT * FROM users WHERE access_token=?";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$token]);
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$result) {
    $response["message"] = "User doesn't Exist";
    echo json_encode($response);
  } else {
    $response["status"] = true;
    $response["message"] = "Successful";
    $response["data"] = $result;
    echo json_encode($response);
  }
  exit;
} catch (Exception $e) {
  error_log("Exception: " . $e->getMessage());
  $response["message"] = "500: Server Error";
  echo json_encode($response);
  exit;
}
