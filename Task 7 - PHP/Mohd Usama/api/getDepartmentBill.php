<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

function fetchData($pdo, $department_id, $excludeEmployeeIds = []) {
    $query = "SELECT
                ec.earndeds_category_name,
                SUM(CASE WHEN ed.earndeds_type = 'Earning' THEN ed.amount ELSE 0 END) AS total_earnings,
                SUM(CASE WHEN ed.earndeds_type = 'Deduction' THEN ed.amount ELSE 0 END) AS total_deductions
              FROM
                EarnDeds ed
              JOIN Employees e ON ed.earndeds_employee_id = e.employee_id
              JOIN EarnDedsCategories ec ON ed.earndeds_category_id = ec.earndeds_category_id
              WHERE
                e.employee_department_id = :department_id
                AND e.employee_id NOT IN (" . implode(",", $excludeEmployeeIds) . ")
              GROUP BY
                ec.earndeds_category_name
              ORDER BY
                ec.earndeds_category_name;";

    $stmt = $pdo->prepare($query);
    $stmt->execute(['department_id' => $department_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getEmpData($pdo, $department_id, $excludeEmployeeIds = []) {
    $query = "SELECT
                ed.name AS employee_name,
                eb.bank_AC_No AS bank_account_number,
                bic.ifsc_code As ifsc_code,
                bic.bank_branch AS bank_branch
              FROM
                Employees e
              JOIN EmployeeDetails ed ON e.employee_details_id = ed.employee_details_id
              JOIN EmployeeBankDetails eb ON e.emp_BankDetails_id = eb.emp_BankDetails_id
              JOIN BankIFSCCodes bic ON eb.bank_ifsc = bic.bank_ifsc_code_id
              WHERE
                e.employee_department_id = :department_id";

    if (!empty($excludeEmployeeIds)) {
        $query .= " AND e.employee_id NOT IN (" . implode(",", $excludeEmployeeIds) . ")";
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute(['department_id' => $department_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getBillEarnDeds($data, $pdo, $department_id, $excludeEmployeeIds = []) {
    $totalEarnings = 0;
    $totalDeductions = 0;
    $earningsArray = [];
    $deductionsArray = [];

    foreach ($data as $entry) {
        $categoryName = $entry['earndeds_category_name'];
        $earnings = $entry['total_earnings'];
        $deductions = $entry['total_deductions'];

        $totalEarnings += $earnings;
        $totalDeductions += $deductions;

        if ($earnings > 0) {
            $earningsArray[$categoryName] = $earnings;
        }

        if ($deductions > 0) {
            $deductionsArray[$categoryName] = $deductions;
        }
    }

    $empsResult = getEmpData($pdo, $department_id, $excludeEmployeeIds);

    return [
        'status' => true,
        'total_earnings' => $totalEarnings,
        'total_deductions' => $totalDeductions,
        'earnings' => $earningsArray,
        'deductions' => $deductionsArray,
        'employees' => $empsResult,
    ];
}

$response = ["status" => false, "message" => ""];
if (!isset($_POST['id']) || empty($_POST['id'])) {
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$department_id = $_POST['id'];
$excludeEmployeeIds = isset($_POST['exclude_ids']) ? $_POST['exclude_ids'] : [];

try {
    $data = fetchData($pdo, $department_id, $excludeEmployeeIds);
    $result = getBillEarnDeds($data, $pdo, $department_id, $excludeEmployeeIds);
    echo json_encode($result);
} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = "Database Error: " . $e->getMessage();
    echo json_encode($response);
}
?>
