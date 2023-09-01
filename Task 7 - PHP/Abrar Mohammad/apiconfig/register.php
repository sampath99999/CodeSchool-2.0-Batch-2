<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'databaseconfig.php';
$response = ["status" => false, "message" => ""];

if (!isset($_POST["firstName"])) {
    $response["status"] = false;
    $response["message"] = "First name field is not included";
    echo json_encode($response);
    exit;
}

if (!isset($_POST["lastName"])) {
    $response["status"] = false;
    $response["message"] = "Last name Field is not included";
    echo json_encode($response);
    exit;
}

if (!isset($_POST["email"])) {
    $response["status"] = false;
    $response["message"] = "Email Field is not included";
    echo json_encode($response);
    exit;
}

if (!isset($_POST["password"])) {
    $response["status"] = false;
    $response["message"] = "Password field is not included";
    echo json_encode($response);
    exit;
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];
$password = md5($password);
$query = "SELECT id FROM users WHERE email = '$email' AND password = '$password'";
$statement = $pdo->query($query);
$res = $statement->fetch();
if ($res && $res['id']) {
    $response["status"] = false;
    $response["message"] = $email . " already exists";
    echo json_encode($response);
    exit;
}
$insertQuery = "INSERT INTO users(firstname,lastname,email,password) VALUES(?,?,?,?);";

$stmt = $pdo->prepare($insertQuery);
$insertRes = $stmt->execute([$firstName, $lastName, $email, $password]);
if ($insertRes) {
    $response["status"] = true;
    $response["message"] = "User Registered Successfully";
    echo json_encode($response);
    exit;
}
?>