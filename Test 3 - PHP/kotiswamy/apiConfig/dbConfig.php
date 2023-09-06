<?php
$dsn = "pgsql:host=localhost;dbname=chat_room_database";
$dbUsername = "postgres";
$dbPassword = "Swamy@61802";

try {
  $pdo = new PDO($dsn, $dbUsername, $dbPassword);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
  exit;
}
