<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

if (!isset($_POST['email'])) {

    $response['status'] = false;
    $response['message'] = "Email Cannot be Empty";
    echo json_encode($response);
    exit;
}
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $response['status'] = false;
    $response['message'] = "Email is Not Valid";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['password'])) {

    $response['status'] = false;
    $response['message'] = "Password Cannot be Empty";
    echo json_encode($response);
    exit;
}

if (!isset($_POST['confirmPassword'])) {

    $response['status'] = false;
    $response['message'] = "Confirm Password Cannot be Empty";
    echo json_encode($response);
    exit;
}

if (($_POST['password']) != ($_POST['confirmPassword'])) {

    $response['status'] = false;
    $response['message'] = "Password and Confirm Password does not match";
    echo json_encode($response);
    exit;
}
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$password = md5($password);

$query = "select id from users where email =?;";
try {
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email]);
    $result = $stmt->fetch();
    if ($result && $result['id']) {
        $response['status'] = false;
        $response['message'] = $email . " already exits";
        echo json_encode($response);
        exit;
    }
} catch (\Exception $e) {
    $error = array("error" => "Registration failed: " . $e->getMessage());
    echo json_encode($error);
}




$query = "Insert into users (name,email,password) values(?,?,?)";

try {
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$name, $email, $password]);

    if ($result) {

        $response['status'] = true;
        $response['message'] = "User Successfully Registered";
        echo json_encode($response);
    }
} catch (\Exception $e) {
    $error = array("error" => "Registration failed: " . $e->getMessage());
    echo json_encode($error);
}
