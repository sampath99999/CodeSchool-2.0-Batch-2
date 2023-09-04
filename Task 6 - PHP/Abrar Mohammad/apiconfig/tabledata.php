<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "databaseconfig.php";

$response = ["status" => false, "message" => "", "data" => []];

try {
    if (isset($_GET['tableName'])) {
        $tableName = $_GET['tableName'];
        $tablesQuery = 'SELECT * FROM ' . $tableName;
        $stmt = $pdo->prepare($tablesQuery);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response["status"] = true;
        $response["message"] = "successful";
        $response["data"] = $result;
        echo json_encode($response);
    } else {
        $response["message"] = "Table Not Found";
        echo json_encode($response);
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = $e->getMessage();
    echo json_encode($response);
}
?>