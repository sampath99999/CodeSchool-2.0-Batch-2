<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$movie_name = $_POST["movie_name"];
$response =  ["status" => false, "message" => ""];

$query = "select movie_name from movies where movie_name =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$movie_name]);
$result = $stmt->fetch();
if ($result) {
    $response["status"] = false;
    $response["message"] = "Movie Already Exists";
    echo json_encode($response);
    exit;
}
$query = "insert into movies(movie_name) values(?);";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$movie_name]);
if ($result) {
    $response["status"] = True;
    $response["message"] = "Movie Added Successfully";
    echo json_encode($response);
} else {
    $response["status"] = false;
    $response["message"] = "Problem Adding Movie";
    echo json_encode($response);
}
