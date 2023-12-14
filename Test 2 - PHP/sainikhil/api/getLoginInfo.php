<?php


error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response =  ["status" => false, "message" => "", "data" => ""];
$token = $_POST['token'];


$query = "select user_id from user_tokens where token =?";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {

    $id = $result['user_id'];
    $query = "select email from users where id =?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
