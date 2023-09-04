<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';



function getUsersList($pdo, $token) {
    try {
        $query = "SELECT user_id,name FROM chat_users WHERE user_token != ?";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(1, $token, PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return [
                'status' => true,
                'users' => $result
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
    $result = getUsersList($pdo, $token,);
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
