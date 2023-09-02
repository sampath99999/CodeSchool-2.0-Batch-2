<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response = ["status" => false, "message" => ""];
if (!isset($_POST['empid']) || empty($_POST['empid'])) {
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$earndeds_employee_id = $_POST['empid'];
$earning = 'Earning';
$deduction = 'Deduction';
$query = "SELECT ED.earndeds_type, ED.earndeds_id ,ED.amount,ED.earndeds_category_id,  EDC.earndeds_category_name FROM EarnDeds ED JOIN EarnDedsCategories EDC ON EDC.earndeds_category_id = ED.earndeds_category_id where earndeds_employee_id = ? AND earndeds_type = ?";
$stmt = $pdo->prepare($query);
$earningsResult = $stmt->execute([$earndeds_employee_id, $earning]);
$earnings = $stmt->fetchAll(PDO::FETCH_ASSOC);
$deductionResult = $stmt->execute([$earndeds_employee_id, $deduction]);
$deductions = $stmt->fetchAll(PDO::FETCH_ASSOC);
$combinedResults = [
    "status" => true,
    "earnings" => $earnings,
    "deductions" => $deductions
];
echo json_encode($combinedResults);
?>
