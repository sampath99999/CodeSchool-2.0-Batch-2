
<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response =  ["status" => false, "message" => "", "data" => ""];
if (!isset($_POST['user'])) {

    $response['status'] = false;
    $response['message'] = "User Name is not present";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['password'])) {

    $response['status'] = false;
    $response['message'] = "Password is not present";
    echo json_encode($response);
    exit;
}

$user = $_POST['user'];
$password = md5($_POST['password']);
$query = "select ID from admin where adminname = ? and password = ?";
$stmt = $db->prepare($query);
$stmt->execute([$user, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['ID']) {

    $token = generateRandomString(10);
    $query = "Update admin set token = ? where adminname =?";
    $stmt = $db->prepare($query);
    $result = $stmt->execute([$token, $user]);

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
