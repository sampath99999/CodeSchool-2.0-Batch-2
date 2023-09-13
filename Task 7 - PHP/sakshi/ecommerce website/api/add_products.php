<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbconfig.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'));
    
    $name = $data->name;
    $price = $data->price;
    $image = $data->image;
    $description = $data->description;
    $categoryId = $data->categoryId;
    
    $query = "INSERT INTO products (productname, productprice, productimage, productdesc, categoryid) VALUES (:productname, :productprice, :productimage, :productdesc, :categoryid)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":productname", $name);
    $stmt->bindParam(":productprice", $price);
    $stmt->bindParam(":productimage", $image);
    $stmt->bindParam(":productdesc", $description);
    $stmt->bindParam(":categoryid", $categoryId);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
