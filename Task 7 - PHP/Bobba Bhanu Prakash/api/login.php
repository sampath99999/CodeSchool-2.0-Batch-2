<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';

$response = ["status" => false, "message" => "", "data" => ""];
if (!isset($_POST['email'])) {

    $response['status'] = false;
    $response['message'] = "Email is not present";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['password'])) {

    $response['status'] = false;
    $response['message'] = "Password is not present";
    echo json_encode($response);
    exit;
}

$email = $_POST['email'];
$password = md5($_POST['password']);
$query = "select email,id from userDetails where email = ? and password = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$email, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['email']) {
    $userId = ($result['id']);
    $token = generateRandomString(10);
    $query = "INSERT INTO tokens(user_id,token) values (?,?)";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$userId, $token]);

    if ($result) {
        $response['status'] = true;
        $response['message'] = "Login successful!";
        $response['data'] = $token;
        $response = json_encode($response);
        echo ($response);
        exit;
    }

} else {
    $response['status'] = false;
    $response['message'] = "Username or Password is invalid.";
    echo json_encode($response);
    exit;
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