<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$branch_name = $_POST["branch_name"];
$branch_address = $_POST["branch_address"];
$theatre_id = $_POST["theatre_id"];


$response =  ["status" => false, "message" => ""];

$query = "select branch_name from branches where branch_name =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$branch_name]);
$result = $stmt->fetch();
if ($result) {
    $response["status"] = false;
    $response["message"] = "Branch Already Exists";
    echo json_encode($response);
    exit;
}
$query = "insert into branches(branch_name,branch_address,theatre_id) values(?,?,?);";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$branch_name, $branch_address, $theatre_id]);
if ($result) {
    $response["status"] = True;
    $response["message"] = "Branch Added Successfully";
    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Problem Adding Branch";
    echo json_encode($response);
}
