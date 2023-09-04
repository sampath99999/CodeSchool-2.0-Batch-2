<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$branch_id = $_POST["branch_id"];
$slots = ['10:00', '2:00', '6:00', '9:00'];

foreach ($slots as $slot) {
    // echo $slot;
    $query = "select branch_id,slot from branch_slots where branch_id = ? and slot=?;";

    $stmt = $pdo->prepare($query);
    $stmt->execute([$branch_id, $slot]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        // echo json_encode($result);
        $valueToRemove = $slot;
        $key = array_search($valueToRemove, $slots);
        if ($key !== false) {
            unset($slots[$key]);
        }
    }
}

echo json_encode($slots);
