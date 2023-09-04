<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$dsn = "pgsql:host=localhost;dbname=bookmyshow;";
$dbusername = "postgres";
$dbpassword = "";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
