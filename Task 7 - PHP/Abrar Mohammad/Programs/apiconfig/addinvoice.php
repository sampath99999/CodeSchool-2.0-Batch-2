<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'databaseconfig.php';

if (!isset($_POST['appointment_id'])) {
    $response['status'] = false;
    $response['message'] = "appointment_id is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['invoice_date'])) {
    $response['status'] = false;
    $response['message'] = "invoice_date is required";
    echo json_encode($response);
    exit;
}

try {
    $response = ["status" => false, "message" => ""];

    $appointmentId = $_POST['appointment_id'];

    $invoiceDate = $_POST['invoice_date'];


    $addInvoiceQuery = "INSERT INTO invoices(appointment_id,invoice_date) VALUES(?,?);";
    $stmt = $pdo->prepare($addInvoiceQuery);
    $result = $stmt->execute([$appointmentId, $invoiceDate]);

    $response['status'] = true;
    $response['message'] = "Invoice added successfully";
    echo json_encode($response);
    exit;

} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}
?>