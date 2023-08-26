<?php
$dsn = "pgsql:host=localhost;dbname=ticket_booking_management";
$dbusername = "postgres";
$dbpassword = "Swamy@61802";

try {
  $pdo = new PDO($dsn, $dbusername, $dbpassword);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
