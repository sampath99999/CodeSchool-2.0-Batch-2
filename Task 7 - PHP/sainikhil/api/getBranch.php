<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$theatre_id = $_POST["theatre_id"];
$movie_id = $_POST["movie_id"];
$query = "select branch_id from branch_slots 
where movie_id =?";
$stmt = $pdo->prepare($query);
$stmt->execute([$movie_id]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < count($result); $i++) {
    $branch_id = $result[$i]["branch_id"];
    // echo ($branch_id);
    $query = "select id,branch_name from branches where id = ? and theatre_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$branch_id, $theatre_id]);

    $result[$i] = $stmt->fetch(PDO::FETCH_ASSOC);
}
echo json_encode($result);

