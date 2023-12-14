<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'dbconfig.php';

$response = ["status" => false, "message" => "", "data" => []];

try {
    $selectDonations = "SELECT * FROM donations";
    $stmt = $pdo->prepare($selectDonations);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data Fetched Successfully";
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