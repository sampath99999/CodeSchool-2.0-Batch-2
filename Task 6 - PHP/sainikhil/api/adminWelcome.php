<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$token = $_POST['token'];
$query = "select a.email from admins a
           inner join tokens t on a.id = t.admin_id
           where token =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);
$result = $stmt->fetch();
echo json_encode($result);
