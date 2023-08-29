<?php
session_start();

// Include your database connection configuration here
$dbConnection = new PDO("pgsql:host=localhost;dbname=moviedatabase", "postgres", "root");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["loginEmail"];
    $password = $_POST["loginPassword"];
   
    // Retrieve user's hashed password from the database based on the provided email
    $selectQuery = "SELECT password FROM users WHERE email = :email";
    $stmt = $dbConnection->prepare($selectQuery);
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && password_verify($password, $result["password"])) {
        // Password is correct, create a user session
        $_SESSION["username"] = $email;
        $_SESSION["created_at"] = time(); // Record session start time in seconds
        
        // Calculate the session expiration time (10 minutes)
        $expiresAt = $_SESSION["created_at"] + 600; // 10 minutes in seconds
        
        // Generate a session token and store it in the database
        $sessionToken = bin2hex(random_bytes(16)); // Generate a random token
        $insertQuery = "INSERT INTO login_activity (username, session_token, expires_at) VALUES (:username, :session_token, to_timestamp(:expires_at))";
        $insertStmt = $dbConnection->prepare($insertQuery);
        $insertStmt->bindParam(":username", $email);
        $insertStmt->bindParam(":session_token", $sessionToken);
        $insertStmt->bindParam(":expires_at", $expiresAt);
        $insertStmt->execute();

        echo "Login successful!";
        header("location:dashboard.php");
    } else {
        // Password is incorrect, show an error message
        echo "Invalid credentials. Please try again.";
    }
}

// Check if session has expired (10 minutes)
if (isset($_SESSION["username"]) && isset($_SESSION["created_at"])) {
    $currentTime = time();
    $sessionExpirationTime = $_SESSION["created_at"] + 600; // 10 minutes in seconds

    if ($currentTime > $sessionExpirationTime) {
        // Session has expired, unset session variables and log out user
        session_unset();
        session_destroy();
        
        // Redirect user to login page
        header("Location: login.html"); // Change to your login page URL
        exit();
    }
}
?>
