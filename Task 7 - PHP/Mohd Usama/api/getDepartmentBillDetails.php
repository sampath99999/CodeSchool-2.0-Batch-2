<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once 'dbconfig.php';

function fetchEmployeeData($pdo, $departmentId) {
    $query = "SELECT
        ED.name AS EmployeeName,
        E.employee_id AS EmpCode,
        E.cader AS Cader,
        D.department_name AS Department,
        E.employee_designation AS Designation,
        SUM(CASE WHEN EarnDed.earndeds_type = 'Earning' THEN EarnDed.amount ELSE 0 END) AS gross,
        SUM(CASE WHEN EarnDed.earndeds_type = 'Deduction' THEN EarnDed.amount ELSE 0 END) AS dedn,
        (SUM(CASE WHEN EarnDed.earndeds_type = 'Earning' THEN EarnDed.amount ELSE 0 END) - SUM(CASE WHEN EarnDed.earndeds_type = 'Deduction' THEN EarnDed.amount ELSE 0 END)) AS net
    FROM
        Employees E
    JOIN
        EmployeeDetails ED ON E.employee_details_id = ED.employee_details_id
    JOIN
        Departments D ON E.employee_department_id = D.department_id
    JOIN
        EarnDeds EarnDed ON E.employee_id = EarnDed.earndeds_employee_id
    WHERE
        E.employee_department_id = ?
    GROUP BY
        E.employee_id,
        ED.name,
        E.cader,
        D.department_name,
        E.employee_designation
    ";

    $stmt = $pdo->prepare($query);
    $result = [];

    if ($stmt->execute([$departmentId])) {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    return $result;
}

function fetchDepartmentSummary($pdo, $departmentId) {
    $query = "SELECT
    d.department_id,
    d.department_name,
    SUM(CASE WHEN ed.earndeds_type = 'Earning' THEN ed.amount ELSE 0 END) AS gross,
    SUM(CASE WHEN ed.earndeds_type = 'Deduction' THEN ed.amount ELSE 0 END) AS dedn,
    SUM(CASE WHEN ed.earndeds_type = 'Earning' THEN ed.amount ELSE -ed.amount END) AS net
    FROM
        Departments d
    JOIN
        Employees emp ON d.department_id = emp.employee_department_id
    LEFT JOIN
        EarnDeds ed ON emp.employee_id = ed.earndeds_employee_id
    WHERE d.department_id = ?
    GROUP BY
        d.department_id, d.department_name";

    $stmt = $pdo->prepare($query);
    $totalResult = [];

    if ($stmt->execute([$departmentId])) {
        $totalResult = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    return $totalResult;
}

$departmentId = $_POST['id'];

$employeeData = fetchEmployeeData($pdo, $departmentId);
$departmentSummary = fetchDepartmentSummary($pdo, $departmentId);

if (empty($employeeData)) {
    $jsonResult = json_encode(["message" => "No data found"]);
} else {
    $jsonResult = json_encode(["status" => true, "data" => $employeeData, "total" => $departmentSummary]);
}

echo $jsonResult;
?>
