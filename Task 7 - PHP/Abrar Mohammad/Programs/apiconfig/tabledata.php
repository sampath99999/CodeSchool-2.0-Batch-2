<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "databaseconfig.php";

$response = ["status" => false, "message" => "", "data" => []];

try {
    if (isset($_GET['tableName'])) {
        $tableName = $_GET['tableName'];
        if ($tableName === 'hospitals') {
            $tablesQuery = 'SELECT hospital_name,address,founded_year FROM ' . $tableName;
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'users') {
            $tablesQuery = 'SELECT firstname,lastname,email,active_status FROM ' . $tableName;
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'doctors') {
            $tablesQuery = 'SELECT doctor_name,specialization,doc_id FROM ' . $tableName;
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'patients') {
            $tablesQuery = 'SELECT patient_name,age,gender FROM ' . $tableName;
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'appointments') {
            $tablesQuery = "SELECT patients.patient_name,doctors.doctor_name,appointments.appointment_date FROM appointments LEFT JOIN patients ON appointments.patient_id = patients.id LEFT JOIN doctors ON appointments.doctor_id = doctors.id";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'diseases') {
            $tablesQuery = "SELECT disease_name,disease_amount AS treatment_cost FROM diseases";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'medicines') {
            $tablesQuery = "SELECT medicine_name,manfacturer,dosage,cost FROM medicines";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'hospital_beds') {
            $tablesQuery = "SELECT hospitals.hospital_name, bed_type,bed_number,bed_charges FROM hospital_beds LEFT JOIN hospitals ON hospital_beds.hospital_id = hospitals.id ORDER BY hospitals.hospital_name ASC";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'invoices') {
            $tablesQuery = "SELECT DISTINCT ON (patients.patient_name)
            invoices.id,
            patients.patient_name,
            patients.age AS patient_age,
            patients.gender AS patient_gender,
            doctors.doctor_name,
            hospitals.hospital_name,
            invoices.invoice_date,
            medicines.cost AS medicine_cost,
            invoice_details.quantity,
            diseases.disease_amount AS surgery_cost,
            hospital_beds.bed_charges,
            medicines.cost * invoice_details.quantity AS medicine_total_cost,
            hospitals.address,
            diseases.disease_name,
            doctors.doc_id,
            medicines.medicine_name,
            appointments.consultation,
            EXTRACT(DAY FROM (invoices.invoice_date - appointments.appointment_date)) AS stay_days,
            (EXTRACT(DAY FROM (invoices.invoice_date - appointments.appointment_date)) * hospital_beds.bed_charges) AS bed_charges_total,
            diseases.disease_amount + medicines.cost * invoice_details.quantity + hospital_beds.bed_charges + (EXTRACT(DAY FROM (invoices.invoice_date - appointments.appointment_date)) * hospital_beds.bed_charges) AS total_cost_per_patient
        FROM
            invoices
        LEFT JOIN
            appointments ON invoices.appointment_id = appointments.id
        LEFT JOIN
            patients ON appointments.patient_id = patients.id
        LEFT JOIN
            doctors ON appointments.doctor_id = doctors.id
        LEFT JOIN
            hospitals ON doctors.hospital_id = hospitals.id
        LEFT JOIN
            invoice_details ON invoices.id = invoice_details.invoice_id
        LEFT JOIN
            medicines ON invoice_details.medicine_id = medicines.id
        LEFT JOIN
            diseases ON medicines.disease_id = diseases.id
        LEFT JOIN hospital_beds ON hospitals.id = hospital_beds.hospital_id
        ORDER BY patients.patient_name, invoices.id;
        ";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'appointment_status') {
            $tablesQuery = "SELECT patients.patient_name,appointment_status.visited from appointment_status LEFT JOIN appointments ON appointment_status.appointment_id = appointments.id LEFT JOIN patients ON appointments.patient_id = patients.id";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        } else if ($tableName === 'invoice_details') {
            $tablesQuery = "SELECT
            patients.patient_name,
            diseases.disease_name,
            diseases.disease_amount,
            medicines.medicine_name,
            medicines.cost AS medicine_cost,
            invoice_details.quantity AS medicine_quantity,
            diseases.disease_amount + medicines.cost * invoice_details.quantity AS total_cost
        FROM
            invoice_details
        LEFT JOIN invoices ON invoice_details.invoice_id = invoices.id
        LEFT JOIN appointments ON invoices.appointment_id = appointments.id
        LEFT JOIN patients ON appointments.patient_id = patients.id
        LEFT JOIN diseases ON invoice_details.disease_id = diseases.id
        LEFT JOIN medicines ON invoice_details.medicine_id = medicines.id
        GROUP BY patients.patient_name,
            diseases.disease_name,
            diseases.disease_amount,
            medicines.medicine_name,
            medicine_cost,
            medicine_quantity,
            total_cost
        ";
            $stmt = $pdo->prepare($tablesQuery);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "successful";
            $response["data"] = $result;
            echo json_encode($response);
        }
    } else {
        $response["message"] = "Table Not Found";
        echo json_encode($response);
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
}
?>