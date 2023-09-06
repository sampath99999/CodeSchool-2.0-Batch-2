<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';
$id=$_POST['id'];
$tablename=$_POST['tablename'];                   
    $query = "SELECT * FROM $tablename WHERE id=$id";
    $stmt = $pdo->query($query);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($products) {
        $response['status'] = true;
        $response['data'] = $products;
    } else {
        $response['status'] = false;
        $response['message'] = "No products found.";
    }

    echo json_encode($response);
?>
