<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
// $response =  ["status" => false, "message" => ""];

$query = "select user_email,task from tasks;";

$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {

    echo json_encode($result);
}
