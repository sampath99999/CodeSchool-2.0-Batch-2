<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$show_ids = $_POST['show_ids'];

$count = 1;


foreach ($show_ids as $show_id) {
    $query = "delete from branch_slots where id = ?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$show_id]);
    $count = +1;
}
// echo $count;
if ($count == count($show_ids)) {
    $response["status"] = True;

    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Error Deleting Show";
    echo json_encode($response);
}
