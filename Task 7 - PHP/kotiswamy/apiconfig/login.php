<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ['status' => false, 'message' => '', 'token' => ''];

if (!isset($_POST["email"])) {
  $response["status"] = false;
  $response["message"] = "Email required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST["password"])) {
  $response["status"] = false;
  $response["message"] = "Password required";
  echo json_encode($response);
  exit;
}

$email = $_POST["email"];

$password = md5($_POST["password"]);

$query = "SELECT * FROM users WHERE email='$email' AND password='$password' ";

$stmt = $pdo->prepare($query);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result["id"]) {
  $token = genreateRandomString(15);
  $query = "UPDATE users SET access_token='$token', status='login' WHERE email='$email'";
  $stmt = $pdo->prepare($query);
  $result = $stmt->execute();
  $response["status"] = true;
  $response["message"] = "Login successful";
  $response["token"] = $token;
  echo json_encode($response);
  exit;
} else {
  $response["status"] = false;
  $response["message"] = "Email or password is invalid";
  echo json_encode($response);
}

function genreateRandomString($length)
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charlength = strlen($characters);
  $randomStr = '';
  for ($i = 0; $i < $length; $i++) {
    $randomStr .= $characters[random_int(0, $charlength - 1)];
  }
  return $randomStr;
}
