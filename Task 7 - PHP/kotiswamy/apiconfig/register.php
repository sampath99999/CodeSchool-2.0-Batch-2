<?PHP

error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

// register

$response = ["status" => false, "message" => ""];



if (!isset($_POST['firstname'])) {
  $response["status"] = false;
  $response["message"] = "Firstname is required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST['lastname'])) {
  $response["status"] = false;
  $response["message"] = "Lastname is required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST['email'])) {
  $response["status"] = false;
  $response["message"] = "Email is required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST['password'])) {
  $response["status"] = false;
  $response["message"] = "Password is required";
  echo json_encode($response);
  exit;
}


$firstname = $_POST["firstname"];

$lastname = $_POST["lastname"];

$email = $_POST["email"];

$password = md5($_POST["password"]);

$query = "SELECT * FROM users WHERE email='$email'";

$stmt = $pdo->query($query);

$result = $stmt->fetch();

if ($result && $result["id"]) {
  $response["status"] = false;
  $response["message"] = "User already exists";
  echo json_encode($response);
  exit;
}

try {
  $query = "INSERT INTO users(firstname,lastname,email,password) VALUES('$firstname','$lastname','$email','$password')";
  $stmt = $pdo->prepare($query);
  $result = $stmt->execute();
  $response["status"] = true;
  $response["message"] = "User Successfully registerd";
  echo json_encode($response);
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}
