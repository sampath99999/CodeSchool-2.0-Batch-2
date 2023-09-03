<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'databaseconfig.php';
$response = ["status" => false, "message" => "", "data" => []];

try {
    $getMedicines = "SELECT * FROM medicines";
    $stmt = $pdo->prepare($getMedicines);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfully";
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