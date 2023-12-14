<?php
error_reporting(E_ALL);
ini_set("display_errors", "0");
ini_set("log_errors", "1");
ini_set("error_log", "error.log");
require_once "dbConfig.php";

$response = ['status' => false, 'message' => '', 'token' => ''];

if (!isset($_POST["email"])) {
  $response["message"] = "Email is Required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST["password"])) {
  $response["message"] = "Password is Required";
  echo json_encode($response);
  exit;
}

$email = $_POST["email"];

$password = md5($_POST["password"]);

try {
  $query = "SELECT * FROM users WHERE email=? AND password=?";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$email, $password]);
  $userResult = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (Exception $e) {
  error_log("Exception: " . $e->getMessage());
  $response["message"] = "500: Server Error";
  echo json_encode($response);
  exit;
}


if ($userResult && $userResult["id"]) {
  try {
    $token = generateRandomString(15);
    $query = "UPDATE users SET access_token=?  WHERE email=?";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$token, $email]);
    $response["status"] = true;
    $response["message"] = "Login Successful";
    $response["token"] = $token;
    echo json_encode($response);
    exit;
  } catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    $response["message"] = "500: Server Error";
    echo json_encode($response);
    exit;
  }
} else {
  $response["message"] = "Email or Password is Invalid";
  echo json_encode($response);
  exit;
}

function generateRandomString($length)
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charLength = strlen($characters);
  $randomStr = '';
  for ($i = 0; $i < $length; $i++) {
    $randomStr .= $characters[random_int(0, $charLength - 1)];
  }
  return $randomStr;
}
