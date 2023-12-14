<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

$response = ["status" => false, "message" => "", "data" => ""];
$userToken = $_POST['userToken'];

try {
    $query = "SELECT firstname FROM userregistration WHERE token = :userToken"; // Use :userToken in the SQL query
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':userToken', $userToken, PDO::PARAM_STR);
    $stmt->execute();
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($userData) {
        $response['status'] = true;
        $response['message'] = $userData['firstname'];
        echo json_encode($response);
        exit;
    } else {
        $response['status'] = false;
        $response['message'] = "User Not Authenticated";
        echo json_encode($response);
        exit;
    }
} catch (PDOException $e) {
    // Handle database connection or query errors here
    $response['message'] = 'Database error: ' . $e->getMessage();
    echo json_encode($response);
    exit;
}
?>
