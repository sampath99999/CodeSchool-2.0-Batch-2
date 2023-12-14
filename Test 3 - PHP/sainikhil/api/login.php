<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => "", "data" => ""];

if (!isset($_POST['email'])) {

    $response['status'] = false;
    $response['message'] = "Email is not Present";
    echo json_encode($response);
    exit;
}

if (!isset($_POST['password'])) {

    $response['status'] = false;
    $response['message'] = "Password is not Present";
    echo json_encode($response);
    exit;
}

$email = $_POST['email'];
$password = $_POST['password'];
$password = md5($password);

$query = "select id from users where email = ? and password = ?";
try {
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email, $password]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && $result['id']) {

        $token = generateRandomString(10);


        $query = "insert into tokens(token,user_id)values(?,?)";
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute([$token, $result['id']]);

        if ($result) {
            $response['status'] = true;
            $response['message'] = "Login successful!";
            $response['data'] = $token;
            echo json_encode($response);
            exit;
        }
    } else {
        $response['status'] = false;
        $response['message'] = "Username or Password is invalid.";
        echo json_encode($response);
        exit;
    }
} catch (\Exception $e) {
    $error = array("error" => "Login failed: " . $e->getMessage());
    echo json_encode($error);
}


function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
