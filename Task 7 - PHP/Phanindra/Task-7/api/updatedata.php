<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ["status" => false, "message" => ""];

try {
    if (isset($_POST['updatedData'])) {
        $updatedData = $_POST['updatedData'];

        if (isset($updatedData['firstname']) && isset($updatedData['lastname']) && isset($updatedData['email'])) {
            $firstname = $updatedData['firstname'];
            $lastname = $updatedData['lastname'];
            $email = $updatedData['email'];

            $query = "UPDATE employees SET firstname = :firstname, lastname = :lastname, email = :email WHERE email = :email";

            $stmt = $pdo->prepare($query);

            $stmt->bindValue(':firstname', $firstname, PDO::PARAM_STR);
            $stmt->bindValue(':lastname', $lastname, PDO::PARAM_STR);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);

            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $response['status'] = true;
                $response['message'] = "Data updated successfully";
            } else {
                $response['message'] = "No records updated";
            }
        } else {
            $response['message'] = "Invalid data received";
        }
    } else {
        $response['message'] = "No data received";
    }
} catch (PDOException $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
