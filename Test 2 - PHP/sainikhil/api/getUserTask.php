<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$email = $_POST['email'];
$query = "select task from tasks where user_email = ?;";

$stmt = $pdo->prepare($query);
$stmt->execute([$email]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {

    echo json_encode($result);
}
