<?php
error_reporting(E_ALL);
ini_set("display_errors", "0");
ini_set("log_errors", "1");
ini_set("error_log", "error.log");
require_once "dbConfig.php";

$response = ["status" => false, "message" => ""];

if (!isset($_POST["message"])) {
  $response["message"] = "Message is Required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST["userId"])) {
  $response["message"] = "User Id is Required";
  echo json_encode($response);
  exit;
}

try {
  $message = $_POST["message"];
  $userId = $_POST["userId"];
  $query = "INSERT INTO messages(message,user_id) VALUES(?,?)";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$message, $userId]);
  $response["status"] = true;
  $response["message"] = "Successful";
  echo json_encode($response);
} catch (Exception $e) {
  error_log("Exception: " . $e->getMessage());
  $response["message"] = "500: Server Error";
  echo json_encode($response);
  exit;
}
