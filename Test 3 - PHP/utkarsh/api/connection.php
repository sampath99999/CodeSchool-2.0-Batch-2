<?php
try {
    $pdo = new PDO("pgsql:host=localhost;port=5467;dbname=shopping;user=postgres;password=utk1610@#");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}