<?php
ini_set('display_errors', '0');
ini_set('log_errors', "1");
ini_set('error_log', "error.log");
require_once 'dbConfig.php';

$response = ["status" => false, "message" => ""];

if (!isset($_FILES['imageUrl'])) {
    $response['message'] = "image_url is required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['title'])) {
    $response['message'] = "Title is Required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['description'])) {
    $response['message'] = "Description is Required";
    echo json_encode($response);
    exit;
}
if (!isset($_POST['category'])) {
    $response['message'] = "Category is Required";
    echo json_encode($response);
    exit;
}

try {
    $getAdmin = "SELECT id FROM admin;";
    $statement = $pdo->prepare($getAdmin);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    $adminId = $result['id'];
    echo $result;
    $imageUrl = $_FILES['imageUrl']['name'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $category = $_POST['category'];
    $target_dir = "uploadImages/";
    $new_file_name = $target_dir . $imageUrl;
    move_uploaded_file($_FILES["imageUrl"]["tmp_name"], $new_file_name);

    $uploadPostQuery = "INSERT INTO posts(image_url,title,description,category,admin_id) VALUES(?,?,?,?,?);";
    $stmt = $pdo->prepare($uploadPostQuery);
    $stmt->execute([$new_file_name, $title, $description, $category, $adminId]);
    $response['status'] = true;
    $response['message'] = "Data Inserted Successfully";
    echo json_encode($response);
    exit;
} catch (Exception $e) {
    error_log($e->getMessage());
    $response['message'] = "Server Error";
    echo json_encode($response);
    exit;
}

?>