<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$theatre_name = $_POST["theatreName"];
$branch_name = $_POST["branchName"];
$branch_address = $_POST["branchAddress"];

$response =  ["status" => false, "message" => ""];

$query = "select theatre_name from theatres where theatre_name =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$theatre_name]);
$result = $stmt->fetch();
if ($result) {
    $response["status"] = false;
    $response["message"] = "Theatre Already Exists";
    echo json_encode($response);
    exit;
}
$query = "insert into theatres(theatre_name) values(?);";
$stmt = $pdo->prepare($query);
$result = $stmt->execute([$theatre_name]);
if ($result) {

    $query = "select id from theatres where theatre_name =?;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$theatre_name]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $result = ($result);
    $theatre_id = $result['id'];
    if ($result) {

        $query = "insert into branches(branch_name,branch_address,theatre_id) values(?,?,?);";
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute([$branch_name, $branch_address, $theatre_id]);
    }
    if ($result) {
        $response["status"] = True;
        $response["message"] = "Theatre Added Successfully";
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Problem Adding Theatre";
    echo json_encode($response);
}
