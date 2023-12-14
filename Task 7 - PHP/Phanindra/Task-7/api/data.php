
<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ["status" => false, "message" => "", "data" => []];



try {



    if (isset($_GET['search']) &&  isset($_GET['tableName']) ) {
     
        $tableName = $_GET['tableName']; 
        $searchQuery = $_GET['search'];

        if($tableName === 'employees'){
           
            $query = "SELECT employees.*,roles.rolename FROM employees INNER JOIN roles ON employees.roleid = roles.roleid  WHERE firstname ILIKE :searchQuery OR lastname ILIKE :searchQuery OR email ILIKE :searchQuery";
        
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':searchQuery', "%$searchQuery%", PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            $response["status"] = true;
            $response["data"] = $result;
        
            echo json_encode($response);
        }


        else if($tableName === 'roles'){
           
            $query = "SELECT * FROM roles WHERE  rolename ILIKE :searchQuery";
        
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':searchQuery', "%$searchQuery%", PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            $response["status"] = true;
            $response["data"] = $result;
        
            echo json_encode($response);
        }

        else if($tableName === 'projects'){
           
            $query = "SELECT * FROM projects WHERE  projectname ILIKE :searchQuery OR cast(startdate as TEXT) ILIKE :searchQuery OR cast(enddate as TEXT) ILIKE :searchQuery OR cast(startdate as TEXT) ILIKE :searchQuery OR cast(completiondate as TEXT) ILIKE :searchQuery";
        
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':searchQuery', "%$searchQuery%", PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            $response["status"] = true;
            $response["data"] = $result;
        
            echo json_encode($response);
        }

        else if($tableName === 'salaries'){
           
            $query = "SELECT * FROM salaries WHERE  cast(amount as TEXT) ILIKE :searchQuery ";
        
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':searchQuery', "%$searchQuery%", PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            $response["status"] = true;
            $response["data"] = $result;
        
            echo json_encode($response);
        }

        else if($tableName === 'attendance'){
           
            $query = "SELECT * FROM attendance WHERE cast(logindatetime as text) ILIKE :searchQuery OR cast(logoutdatetime as text) ILIKE :searchQuery";
        
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':searchQuery', "%$searchQuery%", PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            $response["status"] = true;
            $response["data"] = $result;
        
            echo json_encode($response);
        }
       
        else if($tableName === 'employeeprojects'){
           
            $query = "SELECT * FROM employeeprojects WHERE cast(employeeprojectid as TEXT) ILIKE :searchQuery OR cast(employeeid as TEXT) ILIKE :searchQuery OR cast(projectid as TEXT) ILIKE :searchQuery";
        
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':searchQuery', "%$searchQuery%", PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            $response["status"] = true;
            $response["data"] = $result;
        
            echo json_encode($response);
        } 

    }

    else {
        $response["message"] = "Invalid request";
        echo json_encode($response);
    }
      
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
}
?>









































