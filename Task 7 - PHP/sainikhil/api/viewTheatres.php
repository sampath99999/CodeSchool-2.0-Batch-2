<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

// $response =  ["status" => false, "message" => ""];

$query = "select b.branch_name,b.branch_address,t.theatre_name,b.id from branches b
          left join theatres t on b.theatre_id = t.id  ;";

$stmt = $pdo->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($result);
