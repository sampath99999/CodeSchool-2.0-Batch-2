<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$token=$_POST['token'];
$response = [];
$query="select ud.role
from tokens t
    left join userdetails ud on ud.id = t.user_id
where t.token =?";
$stmt=$pdo->prepare($query);
$stmt->execute([$token]);
$row = $stmt->fetch();
if($row[0]=='hr'){
    $query="select cmp.id
    from tokens t
        left join userdetails ud on ud.id = t.user_id
        left join employees emp on emp.employee_email = ud.email
        left join companies cmp on cmp.id = emp.company_id
    where t.token = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$token]);
    $row = $stmt->fetch();
    $companyid=$row[0];
    $query="select * from employees where company_id=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$companyid]);
    }
else{
    $query = "select * from employees";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
}
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $response[]=$row;
}

echo json_encode($response);