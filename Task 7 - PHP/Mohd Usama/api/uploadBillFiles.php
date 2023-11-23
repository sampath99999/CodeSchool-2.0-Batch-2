<?php
require_once "dbconfig.php";

function uploadFile($file, $bill_id, $pdo) {
    $target_folder = "../files/";
    $target_file = $target_folder . $file['name'];
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $extensions_arr = array("jpg", "jpeg", "png", "pdf", "txt");

    if (in_array($fileType, $extensions_arr)) {
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            $query = "INSERT INTO billFiles(bill_fk, file_name, file_path) VALUES (?, ?, ?) RETURNING id";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$bill_id, $file['name'], $target_file]);
            return "success";
        } else {
            return "failed";
        }
    } else {
        return "failed early";
    }
}

if (isset($_POST['submit'])) {
    $uploadstatuses = [];
    $bill_id = $_POST["id"];

    if (isset($_FILES['files']) && is_array($_FILES['files']['name'])) {
        foreach ($_FILES['files']['name'] as $key => $file_name) {
            $file_tmp = $_FILES['files']['tmp_name'][$key];
        $uploadstatuses[] = uploadFile(['name' => $file_name, 'tmp_name' => $file_tmp], $bill_id,$pdo);
        }
    } else {
        $uploadstatuses[] = "required";
    }

    $uploadstatus = in_array("failed", $uploadstatuses) ? "failed" : (in_array("required", $uploadstatuses) ? "required" : "success");

    $response = [
        'status' => true,
        'uploadstatus' => $uploadstatus,
        'bill' => $bill_id
    ];

    echo json_encode($response);
}
?>
