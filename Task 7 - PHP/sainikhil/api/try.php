<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$theatre_name = $_POST["theatreName"];

$query = "select id from theatres where theatre_name =?;";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$theatre_name]);
$theatre_id = $result;
echo ($theatre_id);
