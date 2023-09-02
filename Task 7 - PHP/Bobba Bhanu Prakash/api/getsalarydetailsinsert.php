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
    $query="select cmp.id,cmp.company_name
    from tokens t
        left join userdetails ud on ud.id = t.user_id
        left join employees emp on emp.employee_email = ud.email
        left join companies cmp on cmp.id = emp.company_id
    where t.token = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$token]);
    $row = $stmt->fetch();
    $companyid=$row[0];
    $companyname=$row[1];
    $query="select * from employees where company_id=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$companyid]);
    $res=[];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $res[]=$row;
    }
    $response[$companyname]=$res;
    }
else{
// $query = "select * from Employees e on s.employee_id = e.id
// left join companies cmp on cmp.id = e.company_id";
$query="select id,company_name from companies";
$stmt = $pdo->prepare($query);
$stmt->execute();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $res[$row['id']]=$row['company_name'];
}
foreach ($res as $companyId => $companyName) {
    $query = "select * from employees where company_id=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$companyId]);

    $employees = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $employees[] = $row;
    }

    $response[$companyName] = $employees;
}
}
echo json_encode($response);