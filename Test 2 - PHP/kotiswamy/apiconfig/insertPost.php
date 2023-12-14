<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ['status' => false, 'message' => '', 'token' => '','role'=>''];



if (!isset($_POST["imageUrl"])) {
  $response["status"] = false;
  $response["message"] = "Image url required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["title"])) {
  $response["status"] = false;
  $response["message"] = "Title required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["description"])) {
  $response["status"] = false;
  $response["message"] = "Description required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["adminId"])) {
  $response["status"] = false;
  $response["message"] = "Admin id required";
  echo json_encode($response);
  exit;
}


$imageUrl=$_POST["imageUrl"];
$title=$_POST["title"];
$description=$_POST["description"];
$adminId=$_POST["adminId"];

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileUploaded"]["name"]);  
move_uploaded_file($_FILES["fileUploaded"]["tmp_name"], $target_file);
$filename=basename($_FILES["fileUploaded"]["name"]);

try{
  $query="INSERT INTO posts(image_url,title,description,admin_id) VALUES('$filename','$title','$description','$adminId')";
  $stmt=$pdo->prepare($query);
  $result=$stmt->execute();
  $response["status"] = true;
  $response["message"] = "Post added";
  echo json_encode($response);
  exit;
}catch(PDOException $e){
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
  exit;
}