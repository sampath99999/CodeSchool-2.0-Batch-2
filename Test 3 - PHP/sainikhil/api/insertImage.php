<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$response =  ["status" => false, "message" => ""];
if (($_POST['categoryInput']) == '') {
    $response['status'] = false;
    $response['message'] = "Name Cannot Be Empty";
    echo json_encode($response);
    exit;
}
if (!isset($_FILES["imageUrl"]["name"])) {
    $response['status'] = false;
    $response['message'] = "Image Input Cannot Be Empty";
    echo json_encode($response);

    exit;
}
$imageUrl = $_FILES["imageUrl"]["name"];
$categoryInput = $_POST["categoryInput"];

$fileType = strtolower(pathinfo($imageUrl, PATHINFO_EXTENSION));
if ($categoryInput !== '' && isset($_FILES["imageUrl"]["name"])) {
    $allowedTypes = array("jpg", "jpeg", "png");
    if (!in_array($fileType, $allowedTypes)) {
        $response['status'] = false;
        $response['message'] = "Error: Only JPG, JPEG, PNG files are allowed";
        echo json_encode($response);
        exit;
    }
}

$target_dir = "upload/";
$new_file_name = $target_dir . $imageUrl;
move_uploaded_file($_FILES["imageUrl"]["tmp_name"], $new_file_name);

$query = "SELECT ID FROM IMAGES WHERE img_url = ?";
try {
    $stmt = $pdo->prepare($query);
    $stmt->execute([$imageUrl]);
    $result = $stmt->fetch();
    if ($result) {
        $response['status'] = false;
        $response['message'] = "Image Already Exists";
        echo json_encode($response);
        exit;
    }
    $query = "INSERT INTO IMAGES(name,img_url)VALUES(?,?)";

    try {
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute([$categoryInput, $imageUrl]);


        if ($result) {
            $response['status'] = true;
            $response['message'] = "Submitted Successfully";
            echo json_encode($response);
        } else {
            $response['status'] = false;
            $response['message'] = "Error Submitting";
            echo json_encode($response);
            exit;
        }
    } catch (\Exception $e) {
        $error = array("error" => "Error Submitting: " . $e->getMessage());
        echo json_encode($error);
    }
} catch (\Exception $e) {
    $error = array("error" => "Error Submitting: " . $e->getMessage());
    echo json_encode($error);
}
