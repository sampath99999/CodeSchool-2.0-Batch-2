
<?php 
$dbdetails = "pgsql:host=localhost;dbname=chatroom";
$dbusername = "postgres";
$dbpassword = "postgres";


try{
    $pdo = new PDO($dbdetails,$dbusername,$dbpassword);
   // echo "connected";

}catch(PDOException $e){
    echo "Connection failed:". $e->getMessage();
}