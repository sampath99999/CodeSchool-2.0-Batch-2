<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';
$response = ["status" => false, "message" => "", "data" => ""];

if (!isset($_POST['email'])) {
    $response["status"] = false;
    $response["message"] = "Email field is Required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['password'])) {
    $response["status"] = false;
    $response["message"] = "Password field is Required";
    echo json_encode($response);
    exit;
}



$email = $_POST['email'];
$password = $_POST['password'];
try {
    $selectQuery = "SELECT * FROM admin WHERE email = ? AND password = ?;";
    $stmt = $pdo->prepare($selectQuery);
    $stmt->execute([$email, $password]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($res) {
        $token = generateRandomString(20);
        $updateQuery = "UPDATE admin set token = ? WHERE email = ?";
        $stamt = $pdo->prepare($updateQuery);
        $result = $stamt->execute([$token, $email]);
        if ($result) {
            $response["status"] = true;
            $response["message"] = "Login Successful";
            $response["data"] = $token;
            echo json_encode($response);
            exit;
        } else {
            $response["status"] = false;
            $response["message"] = "Username or password is incorrect";
            echo json_encode($response);
            exit;
        }
    } else {
        $response['status'] = false;
        $response['message'] = "Username or Password is Invalid";
        echo json_encode($response);
        exit;
    }

} catch (PDOException $e) {
    $response['status'] = false;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}

function generateRandomString($length = 20)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>