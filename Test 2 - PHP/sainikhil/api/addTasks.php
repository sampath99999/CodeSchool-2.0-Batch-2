<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$response =  ["status" => false, "message" => ""];
$user_email = $_POST['userName'];
$task = $_POST['task'];
$query = "insert into tasks(user_email,task)values(?,?);";

$stmt = $pdo->prepare($query);
$stmt->execute([$user_email, $task]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
    $response["status"] = True;
    $response["message"] = "Task Added Successfully";
    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Error Adding Task";
    echo json_encode($response);
}
