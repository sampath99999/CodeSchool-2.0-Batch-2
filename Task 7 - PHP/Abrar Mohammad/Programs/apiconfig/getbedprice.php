<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "data" => []];

if (!isset($_GET['id'])) {
    $response['status'] = false;
    $response['message'] = "bed_id is required";
    echo json_encode($response);
    exit;
}

try {
    $bedId = $_GET['id'];
    $getBedPrice = "SELECT * FROM hospital_beds WHERE id = ?;";
    $stmt = $pdo->prepare($getBedPrice);
    $stmt->execute([$bedId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfuly";
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