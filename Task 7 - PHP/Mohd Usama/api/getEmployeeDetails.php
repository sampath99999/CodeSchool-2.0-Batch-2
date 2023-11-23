<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "message" => ""];

if (!isset($_POST['employee_details_id']) || empty($_POST['employee_details_id']) || !is_numeric($_POST['employee_details_id'])) {
    $response['message'] = "Invalid Request";
} else {
    $employee_details_id = $_POST['employee_details_id'];

    $query = "SELECT
    name,
    fathers_name,
    gender,
    marital_status,
    date_of_birth,
    aadhaar_no,
    address,
    pan_no,
    email_id,
    phone_no
    FROM EmployeeDetails WHERE employee_details_id = :employee_details_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':employee_details_id', $employee_details_id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (count($result) === 0) {
        $response['message'] = "No data found";
    } else {
        $response['status'] = true;
        $response['message'] = "Data fetched successfully";
        $response['data'] = $result;
    }
}

header('Content-Type: application/json');
echo json_encode($response);
