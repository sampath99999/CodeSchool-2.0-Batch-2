<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';
$response = ["status" => false, "message" => "", "data" => []];


try {
    $getInvoice = "SELECT patients.patient_name,invoices.id FROM invoices LEFT JOIN appointments ON invoices.appointment_id = appointments.id LEFT JOIN patients ON appointments.patient_id = patients.id;";
    $stmt = $pdo->prepare($getInvoice);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched";
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