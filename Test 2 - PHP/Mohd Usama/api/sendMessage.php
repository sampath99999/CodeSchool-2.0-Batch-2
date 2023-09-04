<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';



function createChatMessage($pdo, $sender_id, $receiver_id, $message) {
    try {
        $query = "SELECT user_id FROM chat_users WHERE user_token = ?";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(1, $sender_id, PDO::PARAM_STR);
        $stmt->execute();
        $curUserID = $stmt->fetchColumn();
        $query = "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(1, $curUserID, PDO::PARAM_INT);
        $stmt->bindParam(2, $receiver_id, PDO::PARAM_INT);
        $stmt->bindParam(3, $message, PDO::PARAM_STR);

        $stmt->execute();
        return [
            'status' => true,
            'message' => 'Chat Message sent'
        ];
    } catch (PDOException $e) {
        return [
            'status' => false,
            'message' => 'Database Error: ' . $e->getMessage(),
        ];
    }
}

$response = ["status" => false, "message" => ""];

if (!isset($_POST['sender_id']) || empty($_POST['sender_id']) ||
    !isset($_POST['receiver_id']) || empty($_POST['receiver_id']) ||
    !isset($_POST['message']) || empty($_POST['message'])) {
    $response['status'] = false;
    $response['message'] = "Invalid Request";
    echo json_encode($response);
    exit;
}

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];
$message = $_POST['message'];

try {
    $result = createChatMessage($pdo, $sender_id, $receiver_id, $message);
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
