<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';

$email = $_POST['email'];
$password = md5($_POST['password']);
$query = "SELECT userid FROM users WHERE email = ? AND password = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$email, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['userid']) {

    $token = generateRandomString(10);

    $query = "INSERT INTO tokens (userid, tokenvalue) VALUES (?, ?)";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$result['userid'], $token]);

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
?>
