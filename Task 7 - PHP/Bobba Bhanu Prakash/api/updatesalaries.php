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
$id=$_POST['id'];
$sqlDateFormat = date("Y-m-d", strtotime($salaryDate));
$response = ["status"=>false,"message"=>""];
$query="select s.salary_date,emp.date_of_joining from salaries s
left join employees emp on emp.id=s.employee_id where s.employee_id=? and s.id!=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$employeeId,$id]);
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
if($response['status']){
$query = "UPDATE Salaries 
          SET 
              employee_id = ?,
              no_of_leaves = ?,
              salary_date = TO_DATE(?, 'YYYY-MM-DD'),
              salary_per_month = calculate_salary(?, ?, TO_DATE(?, 'YYYY-MM-DD'), ?, false, false),
              overtime_in_hours = ?,
              overtime_pay = calculate_salary(?, ?, TO_DATE(?, 'YYYY-MM-DD'), ?, true, false),
              leaves_deduction = calculate_salary(?, ?, TO_DATE(?, 'YYYY-MM-DD'), ?, false, true)
          WHERE id = ?";

$stmt = $pdo->prepare($query);
$stmt->bindParam(1, $employeeId);
$stmt->bindParam(2, $noOfLeaves);
$stmt->bindParam(3, $sqlDateFormat);
$stmt->bindParam(4, $employeeId);
$stmt->bindParam(5, $noOfLeaves);
$stmt->bindParam(6, $sqlDateFormat);
$stmt->bindParam(7, $overtime);
$stmt->bindParam(8, $overtime);
$stmt->bindParam(9, $employeeId);
$stmt->bindParam(10, $noOfLeaves);
$stmt->bindParam(11, $sqlDateFormat);
$stmt->bindParam(12, $overtime);
$stmt->bindParam(13, $employeeId);
$stmt->bindParam(14, $noOfLeaves);
$stmt->bindParam(15, $sqlDateFormat);
$stmt->bindParam(16, $overtime);
$stmt->bindParam(17, $id);
$stmt->execute();
$response['message']="updated successfully";
}
echo json_encode($response);