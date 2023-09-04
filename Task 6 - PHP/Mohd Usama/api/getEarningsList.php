<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$query = "SELECT E.earndeds_category_id as earning_category_id, E.earndeds_category_name as earning_category_name FROM EarnDedsCategories E WHERE E.category = 'Earning'";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$response = ["status" => false, "data" => []];

if (count($result) > 0) {
    $response["status"] = true;
    $response["data"] = $result;
}

header('Content-Type: application/json');
echo json_encode($response);
?>
