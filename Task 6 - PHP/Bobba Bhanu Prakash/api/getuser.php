<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';

$response = ["status" => false, "message" => "", "data" => ""];
$userId = $_POST['token'];


$query = "select * from tokens t left join userdetails ud on t.user_id=ud.id where t.token=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$userId]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['id']) {
    $response['status'] = true;
    $response['message'] = $result['email'];
    $response['data'] = "Welcome " . $result['first_name'] . " " . $result['last_name'];
    echo json_encode($response);
    exit;
} else {
    $response['status'] = false;
    $response['message'] = "User Not Authenticated";
    echo json_encode($response);
    exit;
}
?>