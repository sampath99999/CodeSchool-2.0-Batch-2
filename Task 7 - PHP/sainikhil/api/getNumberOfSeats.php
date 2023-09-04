<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$branch_id = $_POST["branch_id"];
$movie_id = $_POST["movie_id"];
$slot = $_POST["slot"];
$query = "select seats from branch_slots 
where branch_id =? and movie_id=? and slot = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$branch_id, $movie_id, $slot]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    echo json_encode($result);
}
