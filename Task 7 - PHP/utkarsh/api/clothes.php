<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connection.php';
                                                  
    $query = "SELECT dressname, price, image_url FROM clothes";
    $stmt = $pdo->query($query);
    $clothes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($clothes) {
        $response['status'] = true;
        $response['data'] = $clothes;
    } else {
        $response['status'] = false;
        $response['message'] = "No clothes found.";
    }

    echo json_encode($response);
?>
