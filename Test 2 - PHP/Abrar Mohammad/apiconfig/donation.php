<?php
error_reporting(E_ALL);
ini_set('displays_errors', 1);
include 'dbconfig.php';

$response = ["status" => false, "message" => ""];

if (!isset($_POST['name'])) {
    $response['status'] = false;
    $response['message'] = "name is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['amount'])) {
    $response['status'] = false;
    $response['message'] = "amount is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['cause'])) {
    $response['status'] = false;
    $response['message'] = "cause is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['payment_type'])) {
    $response['status'] = false;
    $response['message'] = "payment_type is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['card_number'])) {
    $response['status'] = false;
    $response['message'] = "card_number is required";
    echo json_encode($response);
    exit;
}


try {
    $name = $_POST['name'];
    $customAmount = $_POST['amount'];
    $cause = $_POST['cause'];
    $paymentType = $_POST['payment_type'];
    $cardNumber = $_POST['card_number'];

    $insertQuert = "INSERT INTO donations(name,amount,cause,payment_type,card_number) VALUES(?,?,?,?,?);";
    $stmt = $pdo->prepare($insertQuert);
    $stmt->execute([$name, $customAmount, $cause, $paymentType, $cardNumber]);
    $response['status'] = true;
    $response['message'] = "Data Inserted Successfully";
    echo json_encode($response);
    exit;
} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}

?>