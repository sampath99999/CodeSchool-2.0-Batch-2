<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$branch_id = $_POST["branch_id"];
$slot = $_POST["slot"];
$seats = $_POST["seats"];
$movie_id = $_POST["movie_id"];



$response =  ["status" => false, "message" => ""];

$query = "select branch_id,slot from branch_slots where branch_id =? and slot =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$branch_id, $slot]);
$result = $stmt->fetch();
if ($result) {
    $response["status"] = false;
    $response["message"] = "Slot Already Full";
    echo json_encode($response);
    exit;
}
$query = "insert into branch_slots(branch_id,slot,seats,movie_id) values(?,?,?,?);";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$branch_id, $slot, $seats, $movie_id]);
if ($result) {
    $response["status"] = True;
    $response["message"] = "Slot Added Successfully";
    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Problem Adding Slot";
    echo json_encode($response);
}
