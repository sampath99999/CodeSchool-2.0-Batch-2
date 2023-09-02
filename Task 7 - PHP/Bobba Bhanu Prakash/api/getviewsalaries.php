<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$id=$_POST['id'];
$response = [];
$query = "select *
from salaries s
    left join earnings e on e.employee_id = s.employee_id
    left join deductions d on d.employee_id = s.employee_id
    left join employees emp on emp.id=s.employee_id
    left join companies cmp on cmp.id= emp.company_id where s.id=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$id]);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $response[]=$row;
}

echo json_encode($response);