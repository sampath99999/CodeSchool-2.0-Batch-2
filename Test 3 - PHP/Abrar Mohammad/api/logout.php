<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', "1");
ini_set('error_log', "error.log");
require_once 'dbConfig.php';
$response = ["status" => false, "message" => "", "data" => ""];

try {
    $logoutQuery = 'UPDATE admin set token = NULL;';
    $stmt = $pdo->prepare($logoutQuery);
    $stmt->execute();
    $response['status'] = true;
    $response['message'] = "Logout Success";
    echo json_encode($response);
    exit;

} catch (Exception $e) {
    error_log($e->getMessage());
    $response['message'] = "Error Occurred While Logout";
    echo json_encode($response);
    exit;
}

?>