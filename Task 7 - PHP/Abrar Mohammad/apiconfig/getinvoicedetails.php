<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';

$response = ["status" => false, "message" => "", "user_name" => "", "data" => []];


try {
    $invoice_query = "SELECT
    invoice_details.invoice_id,
patients.patient_name,
medicines.medicine_name,
medicines.cost AS medicine_cost,
invoice_details.quantity,
diseases.disease_amount + medicines.cost * invoice_details.quantity AS total_amount
FROM
invoice_details
LEFT JOIN invoices ON invoice_details.invoice_id = invoices.id
LEFT JOIN appointments ON invoices.appointment_id = appointments.id
LEFT JOIN patients ON appointments.patient_id = patients.id
LEFT JOIN diseases ON invoice_details.disease_id = diseases.id
LEFT JOIN medicines ON invoice_details.medicine_id = medicines.id
GROUP BY patients.patient_name,total_amount,invoice_details.invoice_id,medicines.medicine_name,medicine_cost,invoice_details.quantity
";
    $stmt = $pdo->prepare($invoice_query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

    $response["status"] = true;
    $response["message"] = "Successful!";
    $response["data"] = $result;
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
}
?>