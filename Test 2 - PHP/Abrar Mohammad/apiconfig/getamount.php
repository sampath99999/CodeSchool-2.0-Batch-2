<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'dbconfig.php';

$response = ["status" => false, "message" => "", "data" => []];

try {
    $selQuery = "SELECT COUNT(name) AS total_members,SUM(amount) AS total_amount FROM donations;";
    $stmt = $pdo->prepare($selQuery);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response['status'] = false;
    $response['message'] = "Data Fetched";
    $response['data'] = $result;
    echo json_encode($response);
    exit;
} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}
?>