<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$token = ($_POST['token']);
$query = "delete from tokens where token=?";
$stmt = $pdo->prepare($query);
if ($stmt->execute([$token])) {
    echo "session expired";
}
?>