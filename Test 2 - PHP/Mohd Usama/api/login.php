<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';



function loginChatUsers($pdo, $username, $password) {
    try {
        $query = "SELECT user_id FROM chat_users WHERE username = ? AND password = ?";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(1, $username, PDO::PARAM_STR);
        $stmt->bindParam(2, $password, PDO::PARAM_STR);

        $stmt->execute();
        $user_id = $stmt->fetchColumn();
        if ($user_id) {
            $query = "UPDATE chat_users SET user_token = ? WHERE user_id = ?";
            $stmt = $pdo->prepare($query);
            $token = md5(uniqid(rand(), true));
            $stmt->bindParam(1, $token, PDO::PARAM_STR);
            $stmt->bindParam(2, $user_id, PDO::PARAM_INT);
            $stmt->execute();
            return [
                'status' => true,
                'message' => 'User Logged In',
                'token' => $token
            ];
        }
        else{
            return [
                'status' => false,
                'message' => 'Invalid Username or Password',
            ];
        }

    } catch (PDOException $e) {
        return [
            'status' => false,
            'message' => 'Database Error: ' . $e->getMessage(),
        ];
    }
}

$response = ["status" => false, "message" => ""];

if (
    !isset($_POST['username']) || empty($_POST['username'])||
    !isset($_POST['password']) || empty($_POST['password']))
    {
        echo json_encode($_POST['username']);
        $response['status'] = false;
        $response['message'] = "Invalid Request";
        echo json_encode($response);
        exit;
    }

$username = $_POST['username'];
$password = md5($_POST['password']);

try {
    $result = loginChatUsers($pdo, $username, $password);
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
