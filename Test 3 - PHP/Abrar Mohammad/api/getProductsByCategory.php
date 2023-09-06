<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', "1");
ini_set('error_log', "error.log");
require_once 'dbConfig.php';
$response = ["status" => false, "message" => "", "data" => []];

try {
    $categoryValue = $_POST['category'];
    $getProductsByCategory = "SELECT to_char(created_time,'dd-mm-yyyy HH12:MI AM') AS date_time,title,image_url,description FROM posts WHERE category = ?;";
    $statement = $pdo->prepare($getProductsByCategory);
    $statement->execute([$categoryValue]);
    while ($eachProduct = $statement->fetchAll(PDO::FETCH_ASSOC)) {
        $response['data'] = $eachProduct;
    }
    ;
    $response['status'] = true;
    $response['message'] = "Data Fetched Successfully";
    echo json_encode($response);
} catch (Exception $e) {
    error_log($e->getMessage());
    $response['message'] = "Error Occurred While fetching Data";
    echo json_encode($response);
}

?>