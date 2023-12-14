<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';
                                                  
    $query = "SELECT id,foodname, price, image_url FROM foods";
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
