<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "data" => []];

try {
    $getDiseases = "SELECT diseases.id, diseases.disease_amount, diseases.disease_name, invoice_details.invoice_id
    FROM diseases
    LEFT JOIN invoice_details ON diseases.id = invoice_details.disease_id
    GROUP BY diseases.id, diseases.disease_amount, diseases.disease_name, invoice_details.invoice_id;
    ";
    $stmt = $pdo->prepare($getDiseases);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successful";
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