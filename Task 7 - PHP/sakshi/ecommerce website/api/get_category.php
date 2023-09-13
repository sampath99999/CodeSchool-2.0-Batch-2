<?php
include_once("dbconfig.php");

$sql = "SELECT * FROM categories";

$categories = [];
$stmt = $pdo-> prepare($sql);
$stmt-> execute();
$result= $stmt-> fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);
?>