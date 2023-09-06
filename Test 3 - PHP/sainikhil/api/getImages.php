<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $query = "SELECT img_url,name FROM IMAGES;";
    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (\Exception $e) {
        $error = array("error" => "Error Loading: " . $e->getMessage());
        echo json_encode($error);
    }
} else {
    $response['status'] = false;
    $response['message'] = "Invalid Method";
    echo json_encode($response);
    exit;
}
