<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "data" => []];


if (!isset($_GET['hospital_id'])) {
    $response['status'] = false;
    $response['message'] = "hospital_id is required";
    echo json_encode($response);
    exit;
}

try {
    $hospitalId = $_GET['hospital_id'];
    $getDocQuery = "SELECT * FROM doctors WHERE hospital_id = ?;";
    $stmt = $pdo->prepare($getDocQuery);
    $stmt->execute([$hospitalId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfully";
    $response['data'] = $result;
    echo json_encode($response);
    exit;
} catch (PDOException $e) {
    echo $e->getMessage();
}

?>