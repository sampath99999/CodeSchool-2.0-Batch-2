<?php
error_reporting(E_ALL);
ini_set("display_errors", "0");
ini_set("log_errors", "1");
ini_set("error_log", "error.log");
require_once "dbConfig.php";


try {
  $query = "SELECT *,u.name FROM messages m LEFT JOIN users u ON m.user_id=u.id  ORDER BY created_at";
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
