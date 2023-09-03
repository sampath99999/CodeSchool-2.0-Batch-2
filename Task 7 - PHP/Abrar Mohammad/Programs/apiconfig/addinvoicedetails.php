<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

$response = ["status" => false, "message" => ""];


if (!isset($_POST['invoice_id'])) {
    $response['status'] = false;
    $response['message'] = "invoice_id is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['disease_id'])) {
    $response['status'] = false;
    $response['message'] = "disease_id is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['medicine_id'])) {
    $response['status'] = false;
    $response['message'] = "medicine_id is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['hospital_bed_id'])) {
    $response['status'] = false;
    $response['message'] = "hospital_bed_id is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['quantity'])) {
    $response['status'] = false;
    $response['message'] = "quantity is required";
    echo json_encode($response);
    exit;
}

try {

    $invoiceId = $_POST['invoice_id'];
    $diseaseId = $_POST['disease_id'];
    $medicineId = $_POST['medicine_id'];
    $hospitalBedId = $_POST['hospital_bed_id'];
    $quantity = $_POST['quantity'];

    $invoDetail = "INSERT INTO invoice_details(invoice_id,disease_id,medicine_id,hospital_bed_id,quantity) VALUES(?,?,?,?,?);";
    $invoStmt = $pdo->prepare($invoDetail);
    $invoStmt->execute([$invoiceId, $diseaseId, $medicineId, $hospitalBedId, $quantity]);
    $response['status'] = true;
    $response['message'] = "Invoice details Added Successfully";
    echo json_encode($response);
    exit;

} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}

?>