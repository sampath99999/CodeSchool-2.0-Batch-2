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
        exit;
    }
    if (!isset($_POST['age'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter Age";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST['gender'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter gender";
        echo json_encode($patientGender);
        exit;
    }
    if (!isset($_POST['contact'])) {
        $response['status'] = false;
        $response['message'] = "Please Enter contact";
        echo json_encode($patientContact);
        exit;
    }
    $insertQuery = "INSERT INTO patients(patient_name,age,gender,contact) VALUES(?,?,?,?);";
    $stmt = $pdo->prepare($insertQuery);
    $result = $stmt->execute([$patientName, $patientAge, $patientGender, $patientContact]);

    if ($result) {
        $response['status'] = true;
        $response['message'] = "Patient Added Successfully";
        echo json_encode($response);
        exit;
    } else {
        $response['status'] = false;
        $response['message'] = "Check The Details Must be Unique";
        echo json_encode($response);
        exit;
    }

} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
    exit;
}

?>