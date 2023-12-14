<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbconfig.php';


function getname($pdo, $id) {
    try {
        $query = "SELECT name FROM chat_users WHERE user_id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(1, $id, PDO::PARAM_STR);
        $stmt->execute();
        $name = $stmt->fetchColumn();
        return [
            'name'=> $name,
        ];
    }catch (PDOException $e) {

    }
}

function getChatMessages($pdo, $token,$otherUserId) {
    try {
        $query = "SELECT user_id FROM chat_users WHERE user_token = ?";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(1, $token, PDO::PARAM_STR);
        $stmt->execute();
        $curUserID = $stmt->fetchColumn();
        $query = "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY message_id ASC";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(1, $curUserID, PDO::PARAM_INT);
        $stmt->bindParam(2, $otherUserId, PDO::PARAM_INT);
        $stmt->bindParam(3, $otherUserId, PDO::PARAM_INT);
        $stmt->bindParam(4, $curUserID, PDO::PARAM_INT);
        $stmt->execute();
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $otheruser = getname($pdo, $otherUserId);
        $cur = getname($pdo,$curUserID);
        return [
            'status' => true,
            'messages' => $messages,
            'user'=> $curUserID,
            'otheruser'=> $otheruser,
            'cur'=> $cur
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
$otherUserId = $_POST['otherUserId'];

try {
$result = getChatMessages($pdo, $token,$otherUserId);
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
