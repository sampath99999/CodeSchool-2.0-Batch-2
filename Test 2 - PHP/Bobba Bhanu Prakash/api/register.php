<?php
require_once 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    // Convert JSON to associative array
    if ($data !== null) {
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $gender = $data['gender'];
        $phonenumber = $data['phonenumber'];
        $dateofbirth = $data['dateofbirth'];
        $email = $data['email'];
        $password = md5($data['password']);
    }
}
$response = ["status" => false, "message" => ""];

$query = "select email from userDetails where email = '$email'";
$stmt = $pdo->query($query);
$result = $stmt->fetch();
if ($result && $result['email']) {
    $response['status'] = false;
    $response['message'] = $email . " already exists";
    echo json_encode($response);
    exit;
}


$userStatus="user";
$query = "Insert into userDetails (first_name, last_name, gender, phone_number, date_of_birth, email, password,user_status)
VALUES (?, ?, ?, ?, ?, ?, ?,?)";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$firstname, $lastname, $gender, $phonenumber, $dateofbirth, $email, $password,$userStatus]);
if ($result) {
    $response['status'] = true;
    $response['message'] = "User Successfully Registered";
    echo json_encode($response);
}