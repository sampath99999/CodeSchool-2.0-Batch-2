<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response = [
    "status" => false,
    "message" => ""
];

if (
    !isset($_POST['empid'], $_POST['type'], $_POST['amount'], $_POST['category_id']) ||
    empty($_POST['empid']) ||
    !is_numeric($_POST['empid']) ||
    empty($_POST['type']) ||
    ($_POST['type'] != 'Earning' && $_POST['type'] != 'Deduction') ||
    empty($_POST['amount']) ||
    !is_numeric($_POST['amount']) ||
    empty($_POST['category_id']) ||
    !is_numeric($_POST['category_id'])
) {
    $response['message'] = "Invalid Request";
} else {
    $earndeds_employee_id = $_POST['empid'];
    $earndeds_type = $_POST['type'];
    $earndeds_category_id = $_POST['category_id'];
    $amount = $_POST['amount'];

    $query = "SELECT earndeds_id FROM EarnDeds WHERE earndeds_employee_id=? AND earndeds_category_id=?";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$earndeds_employee_id, $earndeds_category_id]);
    $updateId = $stmt->fetchColumn();
    if ($updateId) {
        $response['status'] = true;
        $response['message'] = "Earning or Deduction Already Exist";
        $response['code'] = 'Updated';
    } else {
        $insertQuery = "INSERT INTO EarnDeds(earndeds_employee_id, earndeds_type, earndeds_category_id, amount) VALUES(?,?,?,?) RETURNING earndeds_id";
        $insertStmt = $pdo->prepare($insertQuery);
        $insertResult = $insertStmt->execute([$earndeds_employee_id, $earndeds_type, $earndeds_category_id, $amount]);

        if ($insertResult) {
            $insertedId = $insertStmt->fetchColumn();
            $response['status'] = true;
            $response['message'] = "Added Earning";
            $response['inserted_id'] = $insertedId;
            $response['code'] = 'Inserted';
        }
    }
}

echo json_encode($response);
exit;
?>
