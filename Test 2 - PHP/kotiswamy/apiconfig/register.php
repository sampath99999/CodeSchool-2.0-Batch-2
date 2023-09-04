<?PHP

error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

// register

$response = ["status" => false, "message" => ""];



if (!isset($_POST['name'])) {
  $response["status"] = false;
  $response["message"] = "Name is required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST['phoneNo'])) {
  $response["status"] = false;
  $response["message"] = "Phone no  is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST['age'])) {
  $response["status"] = false;
  $response["message"] = "Age  is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST['gender'])) {
  $response["status"] = false;
  $response["message"] = "Gender  is required";
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


$name = $_POST["name"];

$phoneNo = $_POST["phoneNo"];

$age = $_POST["age"];

$gender = $_POST["gender"];

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
  $query = "INSERT INTO users(name,phone,age,gender,email,password) VALUES('$name','$phoneNo','$age','$gender','$email','$password')";
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
