<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
require "db_config.php";

$response = ["status" => false, "message" => "", "data" => []];

try {
    if (isset($_GET['products'])) {
        $productsJSON = $_GET['products'];
        $products = json_decode($productsJSON, true);


        $query = "SELECT * FROM products";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response["status"] = true;
        $response["data"] = $result;

        echo json_encode($response);
    } else {
        $response["message"] = "Invalid request";
        echo json_encode($response);
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
}
