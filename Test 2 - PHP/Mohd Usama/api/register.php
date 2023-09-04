<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';



function createChatUsers($pdo, $name, $username, $email, $password) {
    try {
        $query = "INSERT INTO chat_users (name, username, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(1, $name, PDO::PARAM_STR);
        $stmt->bindParam(2, $username, PDO::PARAM_STR);
        $stmt->bindParam(3, $email, PDO::PARAM_STR);
        $stmt->bindParam(4, $password, PDO::PARAM_STR);

        $stmt->execute();
        return [
            'status' => true,
            'message' => 'Chat User created'
        ];
    } catch (PDOException $e) {
        return [
            'status' => false,
            'message' => 'Database Error: ' . $e->getMessage(),
        ];
    }
}

$response = ["status" => false, "message" => ""];

if (!isset($_POST['name']) || empty($_POST['name']) ||
    !isset($_POST['username']) || empty($_POST['username']) ||
    !isset($_POST['email']) || empty($_POST['email']) ||
    !isset($_POST['password']) || empty($_POST['password'])) {
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$name = $_POST['name'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = md5($_POST['password']);

try {
    $result = createChatUsers($pdo, $name, $username, $email, $password);
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
