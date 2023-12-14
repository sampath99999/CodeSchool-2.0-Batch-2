<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';

$email = $_POST['email'];
$password = md5($_POST['password']);
$role = $_POST['role'];
$query = "SELECT id, password FROM users WHERE email = ? AND password = ? AND roleid = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$email, $password, $role]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['id']) {
   
    $response['status'] = true;
    $response['message'] = "Login successful!";
    echo json_encode($response);
   
    exit;
} else {
  
    $response['status'] = false;
    $response['message'] = "Invalid email, password, or role.";
    echo json_encode($response);
    exit;
}
?>
