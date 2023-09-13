<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbconfig.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["category"])) {
        $category = $_POST['category'];
        $categoryimg = $_POST['image'];
        $query = "INSERT INTO categories (categoryname, categoryimage) VALUES ('$category', '$image')";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":categoryname", $category);
        $stmt->bindParam(":categoryimage", $image);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    }
}
?>
