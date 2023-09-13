<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $number = $_POST["number"];
    $password = $_POST["password"];

    $stmt = $db->prepare("INSERT INTO user_data (name, email, number, password) VALUES (:name, :email, :number, :password)");
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":number", $number);
    $stmt->bindParam(":password", $password);

    if ($stmt->execute()) {
        echo "Data inserted successfully!";
    } else {
        echo "Error inserting data.";
    }
}
