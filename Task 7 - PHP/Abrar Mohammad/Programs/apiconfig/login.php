<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';
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
$password = md5($_POST['password']);

$query = "SELECT id FROM users  WHERE email = ? AND password = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$email, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if ($result && $result['id']) {
    $token = generateRandomString(20);
    $updateQuery = "UPDATE users set token = ?,active_status = ? WHERE email = ?";
    $stamt = $pdo->prepare($updateQuery);
    $result = $stamt->execute([$token, true, $email]);

    if ($result) {
        $response["status"] = true;
        $response["message"] = "Login Successful";
        $response["data"] = $token;
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "Username or password id incorrect";
        echo json_encode($response);
        exit;
    }

} else {
    $response["status"] = false;
    $response["message"] = "Username or password is invalid";
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