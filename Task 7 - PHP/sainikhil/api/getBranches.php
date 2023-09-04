<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$theatre_id = $_POST["theatre_id"];
$query = "select branch_name,id from branches where theatre_id = ?;";

$stmt = $pdo->prepare($query);
$stmt->execute([$theatre_id]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {

    echo json_encode($result);
}
