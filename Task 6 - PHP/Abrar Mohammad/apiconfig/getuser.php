<?php


error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "data" => ""];
$userId = $_POST['token'];


$query = "select * from user_details where token =?";
$stmt = $pdo->prepare($query);
$stmt->execute([$userId]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['user_id']) {

    $response['status'] = true;
    $response['message'] = "Welcome " . $result['email'];
    echo json_encode($response);
    exit;
} else {
    $response['status'] = false;
    $response['message'] = "User Not Authenticated";
    echo json_encode($response);
    exit;
}

?>