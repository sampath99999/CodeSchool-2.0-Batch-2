<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "data" => []];

if (!isset($_GET['id'])) {
    $response['status'] = false;
    $response['message'] = "disease_id is required";
    echo json_encode($response);
    exit;
}

try {
    $diseaseId = $_GET['id'];
    $getCost = "SELECT * FROM diseases WHERE id = ?;";
    $stmt = $pdo->prepare($getCost);
    $stmt->execute([$diseaseId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfull";
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