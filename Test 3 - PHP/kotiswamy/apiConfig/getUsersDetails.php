<?php
error_reporting(E_ALL);
ini_set("display_errors", "0");
ini_set("log_errors", "1");
ini_set("error_log", "error.log");
require_once "dbConfig.php";

$response = ["status" => false, "message" => "", "data" => []];

try {
  $query = "SELECT name FROM users";
  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $response["status"] = true;
  $response["message"] = "Successful";
  $response["data"] = $result;
  echo json_encode($response);
} catch (Exception $e) {
  error_log("Exception: " . $e->getMessage());
  $response["message"] = "500: Server Error";
  echo json_encode($response);
  exit;
}
