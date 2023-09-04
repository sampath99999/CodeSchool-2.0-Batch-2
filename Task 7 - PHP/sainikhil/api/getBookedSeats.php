<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$branch_id = $_POST["branch_id"];
$movie_id = $_POST["movie_id"];
$slot = $_POST["slot"];
// $seats = $_POST["seats"];
// $payment_method = $_POST["payment_method"];



$response =  ["status" => false, "message" => ""];

$query = "select id from branch_slots where branch_id =? and movie_id = ? and slot = ?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$branch_id, $movie_id, $slot]);
$result = $stmt->fetch();
if ($result) {

    $result = json_encode($result);
    $result = json_decode($result);


    $id = ($result->id);
}

$query = "select booked_seat_number from bookings where branch_slots_id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$id]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
