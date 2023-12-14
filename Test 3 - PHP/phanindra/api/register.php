<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
require 'db_config.php';

$respose = ["status"=>false,"message"=>""];

if(!isset($_POST['firstname'])){
    $respose['status']=false;
    $respose['status']="firstname is not present";
    exit;
}

if(!isset($_POST['lastname'])){
    $respose['status']=false;
    $respose['status']="lastname is not present";
    exit;
}

if(!isset($_POST['email'])){
    $respose['status']=false;
    $respose['message']="Email is not present";
    exit;
   }

if(!isset($_POST['number'])){
    $respose['status']=false;
    $respose['status']="number is not present";
    exit;
}


if(!isset($_POST['password'])){
    $respose['status'] =false;
    $respose['message']="Password is not present";
    echo json_encode($respose);
    exit;
}

$firstname=$_POST['firstname'];
$lastname=$_POST['lastname'];
$email = $_POST['email'];
$number = $_POST['number'];
$password=$_POST['password'];
$password = md5($password);

$query = "select * from users where email='$email'";
$stmt = $pdo->query($query);
$result = $stmt->fetch();

if($result && $result['id']){
    $respose['status']=false;
    $respose['message']=$email." already exists";
    echo json_encode($respose);
    exit;
}

$query = "insert into users (firstname,lastname,email,number,password) values(?,?,?,?,?)";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$firstname,$lastname,$email,$number,$password]);

if($result){
    $respose['status']=true;
    $respose['message']="User Successfully Registered";
    echo json_encode($respose);
    exit;
}










