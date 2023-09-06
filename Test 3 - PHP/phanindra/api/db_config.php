
<?php
$dbDetails = "pgsql:host=localhost;dbname=products";
$dbUsername = "postgres";
$dbPassword = "postgres";


try {
    $pdo = new PDO($dbDetails, $dbUsername, $dbPassword);
    // echo "connected";

} catch (PDOException $e) {
    echo "Connection failed:" . $e->getMessage();
}
