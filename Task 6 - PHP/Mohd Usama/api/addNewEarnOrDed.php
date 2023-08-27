<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response=  ["status"=>false,"message"=>""];
if (
    !isset($_POST['empid']) ||
    empty($_POST['empid']) ||
    !is_numeric($_POST['empid']) ||
    !isset($_POST['type']) ||
    empty($_POST['type']) ||
    ($_POST['type'] != 'Earning' && $_POST['type'] != 'Deduction') ||
    !isset($_POST['amount']) ||
    empty($_POST['amount']) ||
    !is_numeric($_POST['amount']) ||
    !isset($_POST['category_id']) ||
    empty($_POST['category_id']) ||
    !is_numeric($_POST['category_id'])
)
{
    $response['status'] = false;
    $response['message'] ="Invalid Request";
    echo json_encode($response);
    exit;
}
$earndeds_employee_id = $_POST['empid'];
$earndeds_type = $_POST['type'];
$earndeds_category_id = $_POST['category_id'];
$amount = $_POST['amount'];
$query = "Insert into EarnDeds(earndeds_employee_id, earndeds_type, earndeds_category_id, amount) values(?,?,?,?) RETURNING earndeds_id";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$earndeds_employee_id,$earndeds_type,$earndeds_category_id,$amount]);
if($result){
    $insertedId = $stmt->fetchColumn();
    $response['status'] = true;
    $response['message'] = "Added Earning";
    $response['inserted_id'] = $insertedId;
    echo json_encode($response);
    exit;
}
?>
