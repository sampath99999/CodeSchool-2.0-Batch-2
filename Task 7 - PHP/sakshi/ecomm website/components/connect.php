<?php

$db_name = 'pgsql:host=localhost;dbname=shop_db';
$user_name = 'postgres';
$user_password = 'postgres';

$conn = new PDO($db_name, $user_name, $user_password);

?>