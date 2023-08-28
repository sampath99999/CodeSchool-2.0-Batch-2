<?php

$dsn = "pgsql:host=localhost;dbname=postgres;";
$dbusername = "postgres";
$dbpassword = "Usama_984";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
