<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$password = md5($password);

$query = "select userid from users where email = '$email'";
$stmt = $pdo->query($query);
$result = $stmt->fetch();
if($result && $result['userid']){
    $response['status'] = false;
    $response['message'] =$email." already exits";
    echo json_encode($response);
    exit;
}

$query = "Insert into users (name,email,password) values(?,?,?)";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$name,$email,$password]);

if($result){

    $response['status'] = true;
    $response['message'] = "User Successfully Registered";
    echo json_encode($response);   
}