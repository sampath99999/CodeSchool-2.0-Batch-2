<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "data" => ""];

if (!isset($_POST['empid']) || empty($_POST['empid'])) {
    $response['data'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$empid = $_POST['empid'];
$query = "SELECT
            SUM(CASE WHEN earndeds_type = 'Earning' THEN amount ELSE 0 END) AS total_earnings,
            SUM(CASE WHEN earndeds_type = 'Deduction' THEN amount ELSE 0 END) AS total_deductions
          FROM
            EarnDeds
          WHERE
            earndeds_employee_id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$empid]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
$total_earnings = $result["total_earnings"];
$total_deductions = $result["total_deductions"];
$difference = $total_earnings - $total_deductions;

$response["status"] = true;
$response["data"] = [
    "Total Gross/Earnings" => $total_earnings,
    "Total Deductions" => $total_deductions,
    "Total Net" => $difference
];

header('Content-Type: application/json');
echo json_encode($response);
?>
