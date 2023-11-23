<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

function validateBillData($pdo, $department_id, $billData) {
    $query = "SELECT COUNT(*) FROM Bills WHERE bill_id = ? AND bill_month = ? AND bill_year = ?";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(1, $department_id, PDO::PARAM_INT);
    $stmt->bindParam(2, $billData['bill_month'], PDO::PARAM_INT);
    $stmt->bindParam(3, $billData['bill_year'], PDO::PARAM_INT);

    $stmt->execute();

    $count = $stmt->fetchColumn();

    if ($count > 0) {
        return true;
    } else {
        return false;
    }
}


function createBillAndBeneficiaries($pdo, $department_id, $billData, $beneficiaries) {
    $pdo->beginTransaction();

    try {
        $query = "INSERT INTO Bills (bill_id, bill_month, bill_year, total_earnings, total_deductions, net_amount)
                  VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(1, $department_id, PDO::PARAM_INT);
        $stmt->bindParam(2, $billData['bill_month'], PDO::PARAM_INT);
        $stmt->bindParam(3, $billData['bill_year'], PDO::PARAM_INT);
        $stmt->bindParam(4, $billData['total_earnings'], PDO::PARAM_INT);
        $stmt->bindParam(5, $billData['total_deductions'], PDO::PARAM_INT);
        $stmt->bindParam(6, $billData['net_amount'], PDO::PARAM_INT);

        $stmt->execute();

        $bill_pk = $pdo->lastInsertId();

        foreach ($beneficiaries as $beneficiary) {
            $employee_id = $beneficiary['employee_id'];
            $amount = $beneficiary['amount'];
            if (is_numeric($amount)){
                $query = "INSERT INTO BillBeneficiaries (bill_pk, employee_id, amount) VALUES (?, ?, ?)";
                $stmt = $pdo->prepare($query);

                $stmt->bindParam(1, $bill_pk, PDO::PARAM_INT);
                $stmt->bindParam(2, $employee_id, PDO::PARAM_INT);
                $stmt->bindParam(3, $amount, PDO::PARAM_INT);

                $stmt->execute();
            }
        }
        $pdo->commit();

        return [
            'status' => true,
            'message' => 'Bill and beneficiaries created successfully',
            'bill_pk' => $bill_pk,
            'code' => 'new'
        ];
    } catch (PDOException $e) {
        $pdo->rollBack();
        return [
            'status' => false,
            'message' => 'Database Error: ' . $e->getMessage(),
        ];
    }
}

$response = ["status" => false, "message" => ""];

if (!isset($_POST['id']) || empty($_POST['id'])) {
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$department_id = $_POST['id'];

if (!isset($_POST['billData']) || !isset($_POST['beneficiaries'])) {
    $response['status'] = false;
    $response['message'] = "Missing bill or beneficiaries data";
    echo json_encode($response);
    exit;
}

$billData = $_POST['billData'];
$beneficiaries = $_POST['beneficiaries'];

try {
    if (validateBillData($pdo, $department_id, $billData)){
        $result = [
            'status' => true,
            'message' => 'Bill and beneficiaries already created',
            'code' => 'old'
        ];
        $response = json_encode($result);
    } else {
        $result = createBillAndBeneficiaries($pdo, $department_id, $billData, $beneficiaries);
        $response = json_encode($result);
    }
    echo $response;
} catch (PDOException $e) {
    $response = [
        'status' => false,
        'message' => "Database Error: " . $e->getMessage(),
    ];
    echo json_encode($response);
}
?>
