<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';
$response = ["status" => false, "message" => ""];

$patientId = $_POST['patient_id'];
$doctorId = $_POST['doctor_id'];
$appointmentDate = $_POST['appointment_date'];
$consultation = $_POST['consultation'];

try {

    if (!isset($_POST['patient_id'])) {
        $response['status'] = false;
        $response['message'] = "patient_id is required";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST['doctor_id'])) {
        $response['status'] = false;
        $response['message'] = "doctor_id is required";
        echo json_encode($response);
    }
    if (!isset($_POST['appointment_date'])) {
        $response['status'] = false;
        $response['message'] = "appointment_date is required";
        echo json_encode($response);
    }
    if (!isset($_POST['consultation'])) {
        $response['status'] = false;
        $response['message'] = "consultation is required";
        echo json_encode($response);
    }

    $addAppointment = "INSERT INTO appointments(patient_id,doctor_id,appointment_date,consultation) VALUES(?,?,?,?);";
    $stmt = $pdo->prepare($addAppointment);
    $result = $stmt->execute([$patientId, $doctorId, $appointmentDate, $consultation]);
    if ($result) {
        $response['status'] = true;
        $response['message'] = "Appointment added successfully";
        echo json_encode($response);
        exit;
    } else {
        $response['status'] = false;
        $response['message'] = "Check the Details Correctly";
        echo json_encode($response);
        exit;
    }
} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}

?>