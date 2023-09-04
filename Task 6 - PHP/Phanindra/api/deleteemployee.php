<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ["status" => false, "message" => ""];


try{ 

    if(isset($_POST['employeeId'])){
        $employeeId = $_POST['employeeId'];
        
        //making employeeId as null in other tables so we dont violate foreign key so we can delete that employee
        $updateQuery = "UPDATE projects SET employeeid = NULL WHERE employeeid = :employeeId";
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->bindValue(':employeeId', $employeeId, PDO::PARAM_INT);
        $updateStmt->execute();

        $updateAttendanceQuery = "UPDATE attendance SET employeeid = NULL WHERE employeeid = :employeeId";
        $updateAttendanceStmt = $pdo->prepare($updateAttendanceQuery);
        $updateAttendanceStmt->bindValue(':employeeId', $employeeId, PDO::PARAM_INT);
        $updateAttendanceStmt->execute();

        $updateSalariesQuery = "UPDATE salaries SET employeeid = NULL WHERE employeeid = :employeeId";
        $updateSalariesStmt = $pdo->prepare($updateSalariesQuery);
        $updateSalariesStmt->bindValue(':employeeId', $employeeId, PDO::PARAM_INT);
        $updateSalariesStmt->execute();

        $updateEmployeeProjectsQuery = "UPDATE employeeprojects SET employeeid = NULL WHERE employeeid = :employeeId";
        $updateEmployeeProjectsStmt = $pdo->prepare($updateEmployeeProjectsQuery);
        $updateEmployeeProjectsStmt->bindValue(':employeeId', $employeeId, PDO::PARAM_INT);
        $updateEmployeeProjectsStmt->execute();




        $query = "DELETE FROM employees WHERE employeeid =$employeeId";
        $stmt = $pdo->prepare($query);
      //  $stmt->bindValue(':employeeId',$employeeId,PDO::PARAM_INT);

        if($stmt->execute()){
           $response["status"]=true;
           $response['message'] = "Employee deketed successfully.";
        } else{
            $response['message'] = "Failed to delete employee.";
 
        }
        echo json_encode($response);

    } else{
        $response['message']="Invalid request";
        echo json_encode($response);
    }

}catch(PDOException $e){
    $response['message']=$e->getMessage()();
    echo json_encode($response);

}

