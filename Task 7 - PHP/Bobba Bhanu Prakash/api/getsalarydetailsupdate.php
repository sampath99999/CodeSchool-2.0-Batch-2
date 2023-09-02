<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$id=$_POST['id'];
$query="select s.*,cmp.company_name,emp.employee_name from salaries s 
left join employees emp on s.employee_id=emp.id
left join companies cmp on cmp.id=emp.company_id 
where s.id=?";
$stmt=$pdo->prepare($query);
$stmt->execute([$id]);
$row = $stmt->fetch();
$response[]=$row;
echo json_encode($response);
