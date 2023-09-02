<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

function fetchDepartmentsWithEmployeeCount($pdo) {
    $query = "SELECT D.department_id, D.department_name, COUNT(E.employee_department_id) AS employee_count
              FROM Departments D
              JOIN Employees E ON D.department_id = E.employee_department_id
              GROUP BY D.department_id, D.department_name";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function fetchDistinctScales($pdo) {
    $query = "SELECT DISTINCT scale_type FROM Employees";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$response = [
    "status" => false,
    "data" => [],
];

try {
    $departments = fetchDepartmentsWithEmployeeCount($pdo);
    $scales = fetchDistinctScales($pdo);

    $response["status"] = true;
    $response["data"]["scales"] = $scales;
    $response["data"]["departments"] = $departments;
    $response["data"]["bill_type"] = "Salary Bill";

} catch (PDOException $e) {
    $response["data"] = "An error occurred: " . $e->getMessage();
}

echo json_encode($response);
?>
