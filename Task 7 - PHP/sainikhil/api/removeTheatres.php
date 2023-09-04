<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');
$branch_ids = $_POST["branch_ids"];
$response =  ["status" => false, "message" => ""];




foreach ($branch_ids as $branch_id) {
    $query = "select theatre_id from branches where id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$branch_id]);
    $result = $stmt->fetch();
    if ($result) {
        // var_dump($result);
        $theatre_ids[$branch_id] = ($result["theatre_id"]);
        // var_dump($theatre_ids);
        $unique_theatreids = array_unique($theatre_ids);
    }
}

$result = $stmt->fetch(PDO::FETCH_ASSOC);




foreach ($branch_ids as $branch_id) {
    $query = "delete from branches where id =?;";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$branch_id]);

    if ($result) { {
            foreach ($unique_theatreids as $unique_theatreid) {
                $query = "select theatre_id from branches where theatre_id = ?";
                $stmt = $pdo->prepare($query);
                $stmt->execute([$unique_theatreid]);
                $result = $stmt->fetch();
                var_dump($result);
                if (!$result) {

                    $query = "delete from theatres where id = ?";
                    $stmt = $pdo->prepare($query);
                    $stmt->execute([$unique_theatreid]);
                    $result = $stmt->fetch();
                }
            }

            $response["status"] = True;
            $response["message"] = "Theatre Deleted Successfully";
            echo json_encode($response);
        }
    } else {
        $response["status"] = False;
        $response["message"] = "Error Deleting Theatre";
        echo json_encode($response);
    }
}
