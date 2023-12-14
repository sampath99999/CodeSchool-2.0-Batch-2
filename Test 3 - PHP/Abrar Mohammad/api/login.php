<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', "1");
ini_set('error_log', "error.log");
require_once 'dbConfig.php';
$response = ["status" => false, "message" => "", "data" => ""];

if (!isset($_POST['email'])) {
    $response["message"] = "Email field is Required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['password'])) {
    $response["message"] = "Password field is Required";
    echo json_encode($response);
    exit;
}




try {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $selectQuery = "SELECT * FROM admin WHERE email = ? AND password = ?;";
    $stmt = $pdo->prepare($selectQuery);
    $stmt->execute([$email, $password]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($res) {
        $token = generateRandomString(20);
        $updateQuery = "UPDATE admin set token = ? WHERE email = ?";
        $stmt = $pdo->prepare($updateQuery);
        $result = $stmt->execute([$token, $email]);
        if ($result) {
            $response["status"] = true;
            $response["message"] = "Login Successful";
            $response["data"] = $token;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Username or password is incorrect";
            echo json_encode($response);
            exit;
        }
    } else {
        $response['message'] = "Username or Password is Invalid";
        echo json_encode($response);
        exit;
    }

} catch (Exception $e) {
    error_log($e->getMessage());
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