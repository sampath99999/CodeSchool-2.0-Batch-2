<?php
$host = "localhost";
$dbname = "adminlogin";
$user = "postgres";
$password = "postgres";

$db = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
