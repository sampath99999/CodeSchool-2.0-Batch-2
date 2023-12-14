<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "message" => "", "data" => ""];
if (!isset($_POST['token'])) {

    $response['status'] = false;
    $response['message'] = "token is not present";
    echo json_encode($response);
    exit;
}
$userId = $_POST['token'];

try{
$query = "select * from tokens t left join userdetails ud on t.user_id=ud.id where t.token=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$userId]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
}
catch(\Exception $e){
    $response['message']="error".$e;
}

if ($result && $result['id']) {
    $response['status'] = true;
    $response['message'] = $result['email'];
    $response['data'] = "Welcome " . $result['email'];
    echo json_encode($response);
    exit;
} else {
    $response['status'] = false;
    $response['message'] = "User Not Authenticated";
    echo json_encode($response);
    exit;
}
?>