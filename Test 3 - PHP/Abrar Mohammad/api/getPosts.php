<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', "1");
ini_set('error_log', "error.log");
require_once 'dbConfig.php';
$response = ["status" => false, "message" => "", "data" => []];

try {
    $getPosts = "SELECT * FROM posts;";
    $statement = $pdo->prepare($getPosts);
    $statement->execute();
    while ($eachProduct = $statement->fetchAll(PDO::FETCH_ASSOC)) {
        $response['data'] = $eachProduct;
    }
    ;
    $response['status'] = true;
    $response['message'] = "Data Fetched";
    echo json_encode($response);
    exit;
} catch (Exception $e) {
    error_log($e->getMessage());
    $response['message'] = "Error Occurred while Fetching Data";
    echo json_encode($response);
    exit;
}

?>