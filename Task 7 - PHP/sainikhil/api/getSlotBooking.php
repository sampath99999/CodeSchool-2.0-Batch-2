<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$branch_id = $_POST["branch_id"];
$movie_id = $_POST["movie_id"];
$query = "select slot from branch_slots 
where branch_id =? and movie_id=? ";
$stmt = $pdo->prepare($query);
$stmt->execute([$branch_id, $movie_id]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);
