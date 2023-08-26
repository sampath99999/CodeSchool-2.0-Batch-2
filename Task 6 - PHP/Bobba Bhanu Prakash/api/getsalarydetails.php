<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$response = [];
$query = "select
s.*,
e.employee_name,
cmp.company_name
from Salaries s
left join Employees e on s.employee_id = e.id
left join companies cmp on cmp.id = e.company_id;";
$stmt = $pdo->prepare($query);
$stmt->execute();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $response[]=$row;
}

echo json_encode($response);
?>