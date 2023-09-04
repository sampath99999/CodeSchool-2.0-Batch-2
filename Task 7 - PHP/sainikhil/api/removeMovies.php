<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$movie_ids = $_POST['movie_ids'];

$count = 1;


foreach ($movie_ids as $movie_id) {
    $query = "delete from movies where id = ?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$movie_id]);
    $count = +1;
}
// echo $count;
if ($count == count($productIds)) {
    $response["status"] = True;

    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Error Deleting Movie";
    echo json_encode($response);
}
