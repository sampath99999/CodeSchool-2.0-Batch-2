<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';

$query = "SELECT id, image_url, dress_name, rating, dress_size, price FROM dresses";
$stmt = $pdo->prepare($query);
$stmt->execute();

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
