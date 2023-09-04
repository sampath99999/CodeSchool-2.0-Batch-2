

<?php

error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";


$response = ["status"=>false,"message"=>"","data"=>[]];





    if(!isset($_POST['firstname'])){
        $response['status']=false;
        $response['status']="firstname is not present";
        exit;
    }
    
    if(!isset($_POST['lastname'])){
        $response['status']=false;
        $response['status']="lastname is not present";
        exit;
    }
 
    if(!isset($_POST['email'])){
        $response['status']=false;
        $response['message']="Email is not present";
        exit;
       }
    
    
       if(!isset($_POST['benchStatus'])){
        $respose['status']=false;
        $respose['status']="bench status is not present";
        exit;
    }

    if(!isset($_POST['roleid'])){
        $response['status']=false;
        $response['status']="roleid is not present";
        exit;
    }

    if(!isset($_POST['gender'])){
        $response['status']=false;
        $response['status']="gender is not present";
        exit;
    }

   


    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $gender = $_POST['gender'];
    $benchStatus = $_POST['benchStatus'];
    $roleid = $_POST['roleid'];

   
   
    
$insertquery = "INSERT INTO employees(firstname, lastname, email, contactnumber, gender, benchstatus, roleid) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($insertquery);
$result = $stmt->execute([$firstname, $lastname, $email, $number, $gender, $benchStatus, $roleid]);

if ($result) {
    $newEmployeeId = $pdo->lastInsertId(); 
    $response['status'] = true;
    $response['employeeid'] = $newEmployeeId;
    $response['message'] = "Employee Added Successfully";
} else {
    $response['message'] = "Failed to add employee";
}

echo json_encode($response);

/*

$newEmployeeId = $pdo->lastInsertId();

$response["status"] = true;
$response["message"] = "Employee added successfully.";
$response["employeeid"] = $newEmployeeId;

echo json_encode($response);

    
*/

