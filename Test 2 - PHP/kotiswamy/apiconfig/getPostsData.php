<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$repsonse = ["status" => false, "message" => "", "data" => []];

if (!isset($_GET["token"])) {
  $response["status"] = false;
  $response["message"] = "Token is required";
  echo json_encode($response);
  exit;
}

$toekn = $_GET["token"];

try {
  $query = "SELECT * FROM users WHERE access_token='$toekn'";
  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
  exit;
}

if (!$result) {
  $response["status"] = false;
  $response["message"] = "User doesnot exist";
  echo json_encode($response);
  exit;
} else {
  try {
    $query = "SELECT * FROM posts";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
    $response["message"] = "Success";
    $response["data"] = $result;
    echo json_encode($response);
    exit;
  } catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
    exit;
  }
}
