<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "message" => ""];
if (!isset($_POST['entryid']) || empty($_POST['entryid'])) {
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$earndeds_id = $_POST['entryid'];
$query = "DELETE FROM EarnDeds WHERE earndeds_id = ?";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$earndeds_id]);

if ($result){
    $response['status'] = true;
    $response['message'] = "Success";
    echo json_encode($response);
}
