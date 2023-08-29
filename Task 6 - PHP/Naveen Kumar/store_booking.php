<?php
session_start();

// Check if the user is not logged in, redirect to login page
if (!isset($_SESSION["username"])) {
  //  $email = $_SESSION["username"];
    header("Location: login.html");
    exit();
}

// Include your database connection configuration here
$dbConnection = new PDO("pgsql:host=localhost;dbname=moviedatabase", "postgres", "root", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user details from the session
    $email = $_SESSION["username"]; // Assuming the user's email is stored as username in session

    // ... (rest of your code)
      // Retrieve user details from the database
      $selectUserQuery = "SELECT name, email, mobile FROM users WHERE email = :email";
      $selectUserStmt = $dbConnection->prepare($selectUserQuery);
      $selectUserStmt->bindParam(":email", $email);
      $selectUserStmt->execute();
      $userDetails = $selectUserStmt->fetch(PDO::FETCH_ASSOC);
  
      if ($userDetails) {
          $username = $userDetails["name"];
          $email = $userDetails["email"];
          $mobile = $userDetails["mobile"];
          $movieTitle = $_POST["movieTitle"];
          $bookingDate = $_POST["bookingDate"];
          $seatsCount = $_POST["seatsCount"];
          $totalPrice = $_POST["totalPrice"];
  
          // Insert booking record into the database
          $insertQuery = "INSERT INTO booking_history (username, email, mobile, movie_title, booking_date, seats_count, total_price) 
                          VALUES (:username, :email, :mobile, :movie_title, :booking_date, :seats_count, :total_price)";
          $insertStmt = $dbConnection->prepare($insertQuery);
          $insertStmt->bindParam(":username", $username);
          $insertStmt->bindParam(":email", $email);
          $insertStmt->bindParam(":mobile", $mobile);
          $insertStmt->bindParam(":movie_title", $movieTitle);
          $insertStmt->bindParam(":booking_date", $bookingDate);
          $insertStmt->bindParam(":seats_count", $seatsCount);
          $insertStmt->bindParam(":total_price", $totalPrice);
  

    if ($insertStmt->execute()) {
        echo "Booking successful!";
    } else {
        echo "Booking failed. Please try again.";
        var_dump($insertStmt->errorInfo()); // Debugging
    }
}
}
?>
