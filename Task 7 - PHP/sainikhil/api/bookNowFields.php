<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');




$query = "select m.movie_name, t.theatre_name ,
b.branch_name,bs.slot from branch_slots bs 
left join branches b on b.id = bs.branch_id
left join theatres t on t.id = b.theatre_id
left join movies m on m.id = bs.movie_id;
 ";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
