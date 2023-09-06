<?PHP

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set("error_log", "error.log");
require_once 'dbConfig.php';

// register

$response = ["status" => false, "message" => ""];



if (!isset($_POST['name'])) {
  $response["message"] = "Name is Required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST['phoneNo'])) {
  $response["message"] = "Phone no  is Required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST['age'])) {
  $response["message"] = "Age  is Required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST['gender'])) {
  $response["message"] = "Gender  is Required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST['email'])) {
  $response["message"] = "Email is Required";
  echo json_encode($response);
  exit;
}
if (!isset($_POST['password'])) {
  $response["message"] = "Password is Required";
  echo json_encode($response);
  exit;
}


$name = $_POST["name"];

$phoneNo = $_POST["phoneNo"];

$age = $_POST["age"];

$gender = $_POST["gender"];

$email = $_POST["email"];

$password = md5($_POST["password"]);

try {
  $query = "SELECT * FROM users WHERE email=?";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$email]);
  $result = $stmt->fetch();
} catch (Exception $e) {
  error_log("Exception: " . $e->getMessage());
  $response["message"] = "500:Server Error";
  echo json_encode($response);
  exit;
}

if ($result && $result["id"]) {
  $response["message"] = "User Already Exists";
  echo json_encode($response);
  exit;
}

try {
  $query = "INSERT INTO users(name,phone,age,gender,email,password) VALUES(?,?,?,?,?,?)";
  $stmt = $pdo->prepare($query);
  $result = $stmt->execute([$name, $phoneNo, $age, $gender, $email, $password]);
  $response["status"] = true;
  $response["message"] = "User Successfully Registered";
  echo json_encode($response);
} catch (Exception $e) {
  error_log("Exception: " . $e->getMessage());
  $response["message"] = "500: Server Error";
  echo json_encode($response);
  exit;
}
