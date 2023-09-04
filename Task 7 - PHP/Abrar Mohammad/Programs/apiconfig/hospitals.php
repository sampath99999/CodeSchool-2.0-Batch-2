<?php
error_reporting(E_ALL);
ini_set('dispaly_errors', 1);
include 'databaseconfig.php';
$response = ["status" => false, "message" => "", "data" => []];

try {
    $getHospitals = "SELECT * FROM hospitals;";
    $stmt = $pdo->prepare($getHospitals);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched Successfully";
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