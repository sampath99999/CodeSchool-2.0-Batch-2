<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';

$query = "SELECT E.employee_id AS id, E.employee_details_id AS EmployeeDetailsId, ED.name AS EmployeeName,E.cader AS Cader, D.department_name AS Department, E.employee_designation AS Designation, E.status AS Status, E.scale_type AS ScaleType
FROM Employees E
JOIN EmployeeDetails ED ON E.employee_details_id = ED.employee_details_id
JOIN Departments D ON E.employee_department_id = D.department_id";

$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$jsonResult = json_encode($result);
if (count($result) === 0) {
    $jsonResult = json_encode(["message" => "No data found"]);
}
echo $jsonResult;
?>
