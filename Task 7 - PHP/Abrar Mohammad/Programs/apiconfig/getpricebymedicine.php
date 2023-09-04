<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "data" => []];

if (!isset($_GET['id'])) {
    $response['status'] = false;
    $response['message'] = "id is required";
    echo json_encode($response);
    exit;
}

try {
    $medicineId = $_GET['id'];
    $getPrice = "SELECT * FROM medicines WHERE id = ?;";
    $stmt = $pdo->prepare($getPrice);
    $stmt->execute([$medicineId]);
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