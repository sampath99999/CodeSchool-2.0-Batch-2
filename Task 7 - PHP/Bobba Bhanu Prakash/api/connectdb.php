<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
    
$host = "localhost";
$dbname = "crm";
$username = "postgres";
$password = "bhanu";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "crm connected successfully";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>