<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';
$response = ["status" => false, "message" => ""];

$patientName = $_POST['patient_name'];
$patientAge = $_POST['age'];
$patientGender = $_POST['gender'];
$patientContact = $_POST['contact'];
try {
    if (!isset($_POST['patient_name'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter Patient Name";
        echo json_encode($response);
    } else {
        echo json_encode($patientName);
    }
    if (!isset($_POST['age'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter Age";
        echo json_encode($response);
    } else {
        echo json_encode($patientAge);
    }
    if (!isset($_POST['gender'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter gender";
        echo json_encode($patientGender);
    } else {
        echo json_encode($patientGender);
    }
    if (!isset($_POST['contact'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter contact";
        echo json_encode($patientContact);
    } else {
        echo json_encode($patientGender);
    }

    $insertQuery = "INSERT INTO patients(patient_name,age,gender,contact) VALUES(?,?,?,?);";
    $stmt = $pdo->prepare($insertQuery);
    $result = $stmt->execute([$patientName, $patientAge, $patientGender, $patientContact]);

} catch (PDOException $e) {
    echo 'hi';
}

?>