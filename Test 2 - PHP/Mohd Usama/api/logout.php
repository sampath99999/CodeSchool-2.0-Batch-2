<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';



function logoutChatUser($pdo, $token) {
    try {
        $query = "UPDATE chat_users SET user_token = ? WHERE user_token = ?";
            $stmt = $pdo->prepare($query);
            $newtoken = '';
            $stmt->bindParam(1, $newtoken, PDO::PARAM_STR);
            $stmt->bindParam(2, $token, PDO::PARAM_STR);
            $stmt->execute();
            return [
                'status' => true,
                'message' => 'User Logged Out'
            ];
    } catch (PDOException $e) {
        return [
            'status' => false,
            'message' => 'Database Error: ' . $e->getMessage(),
        ];
    }
}

$response = ["status" => false, "message" => ""];

if (!isset($_POST['token']) || empty($_POST['token'])){
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$token = $_POST['token'];

try {
    $result = logoutChatUser($pdo, $token,);
    $response = json_encode($result);
    echo $response;
} catch (PDOException $e) {
    $response = [
        'status' => false,
        'message' => "Database Error: " . $e->getMessage(),
    ];
    echo json_encode($response);
}
?>
