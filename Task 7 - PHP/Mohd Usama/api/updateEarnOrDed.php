<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$response = ["status" => false, "message" => ""];
if (!isset($_POST['entryid']) || empty($_POST['entryid']) || !isset($_POST['amount']) || empty($_POST['amount']) || !is_numeric($_POST['amount'])) {
    $response['message'] = "Invalid Request";
} else {
    $earndeds_id = $_POST['entryid'];
    $amount = $_POST['amount'];
    if ($amount <= 0) {
        $response['message'] = "Amount must be a positive number";
    } elseif (strlen($amount) > 10) {
        $response['message'] = "Amount length cannot be more than 10 characters";
    } else {
        $query = "UPDATE EarnDeds SET amount = ? WHERE earndeds_id = ?";
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute([$amount, $earndeds_id]);

        if ($result) {
            $response['status'] = true;
            $response['message'] = "Success";
        } else {
            $response['message'] = "Failed to update the database";
        }
    }
}

echo json_encode($response);
?>
