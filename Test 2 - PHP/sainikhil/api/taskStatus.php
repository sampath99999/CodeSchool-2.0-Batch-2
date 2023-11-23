<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$response =  ["status" => false, "message" => ""];
$email = $_POST['email'];
$status = $_POST['status'];
$task_id = $_POST['task_id'];



$query = "select id from task_status where task_id = ? and user_email =?;";

$stmt = $pdo->prepare($query);
$stmt->execute([$task_id, $email]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
    $id = $result['id'];
    $query = "update task_status set status = ? where id =?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$status, $id]);
} else {
    $query = "insert into task_status(user_email,task_id,status) values(?,?,?) ";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email, $task_id, $status]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// else {
//     echo 'no';
// }
