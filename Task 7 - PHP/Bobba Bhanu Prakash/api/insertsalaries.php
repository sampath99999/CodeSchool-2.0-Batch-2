<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$token=$_POST['token'];
$employeeId=$_POST['employeeId'];
$employeeName=$_POST['employeeName'];
$companyName=$_POST['companyName'];
$overtime=$_POST['overtime'];
$noOfLeaves=$_POST['noOfLeaves'];
$salaryDate=$_POST['salaryDate'];
$sqlDateFormat = date("Y-m-d", strtotime($salaryDate));
$response = ["status"=>false,"message"=>""];
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
    $query="select s.salary_date,emp.date_of_joining from salaries s
    left join employees emp on emp.id=s.employee_id where s.employee_id=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$employeeId]);
    $res=[];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $res[]=$row['salary_date'];
        $dateOfJoining=$row['date_of_joining'];
    }
   foreach($res as $key=> $value){
    $value = (string) $value;
   if (substr($value, 0, 7) == substr($salaryDate, 0, 7)) {
    $response['status']=false;
    $response['message']="salary already exist in that month";
   }
   else if(strtotime($salaryDate)<strtotime($dateOfJoining)){
    $response['status']=false;
    $response['message']="Salary date must exceeds date of joining";
   }
   else{
    $response['status']=true;
   }
   }
}
else{
$query="select s.salary_date,emp.date_of_joining from salaries s
left join employees emp on emp.id=s.employee_id where s.employee_id=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$employeeId]);
$res=[];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $res[]=$row['salary_date'];
    $dateOfJoining=$row['date_of_joining'];
}
foreach ($res as $key => $value) {
    $value = (string) $value;
    if (substr($value, 0, 7) == substr($salaryDate, 0, 7)) {
     $response['status']=false;
     $response['message']="salary already exist in that month";
    }
    else if(strtotime($salaryDate)<strtotime($dateOfJoining)){
        $response['status']=false;
        $response['message']="Salary date must exceeds date of joining";
    }
    else{
        $response['status']=true;
    }
    }
}
if($response['status']){

$query = "INSERT INTO Salaries (
    employee_id,
    no_of_leaves,
    salary_date,
    salary_per_month,
    overtime_in_hours,
    overtime_pay,
    leaves_deduction
) VALUES (
    :employeeId,
    :noOfLeaves,
    TO_DATE(:sqlDateFormat, 'YYYY-MM-DD'),
    (SELECT calculate_salary(:employeeId, :noOfLeaves, TO_DATE(:sqlDateFormat, 'YYYY-MM-DD'), :overtime, false, false)),
    :overtime,
    (SELECT calculate_salary(:employeeId, :noOfLeaves, TO_DATE(:sqlDateFormat, 'YYYY-MM-DD'), :overtime, true, false)),
    (SELECT calculate_salary(:employeeId, :noOfLeaves, TO_DATE(:sqlDateFormat, 'YYYY-MM-DD'), :overtime, false, true))
)";

$stmt = $pdo->prepare($query);
$stmt->bindParam(':employeeId', $employeeId);
$stmt->bindParam(':noOfLeaves', $noOfLeaves);
$stmt->bindParam(':sqlDateFormat', $sqlDateFormat);
$stmt->bindParam(':overtime', $overtime);
$stmt->execute();

$response['message']="inserted successfully";
}
echo json_encode($response);