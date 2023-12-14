<?php


error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

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
}

$email = $result['email'];
$query = "select task from tasks where user_email = ?;";

$stmt = $pdo->prepare($query);
$stmt->execute([$email]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {

    echo json_encode($result);
}
