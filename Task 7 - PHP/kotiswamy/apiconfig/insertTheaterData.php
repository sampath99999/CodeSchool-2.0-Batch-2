<?PHP
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ["status" => true, "message" => ""];
if (!isset($_POST["name"])) {
  $response["status"] = false;
  $response["message"] = "Name is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["seatingCapacity"])) {
  $response["status"] = false;
  $response["message"] = "Seating capacity is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["address"])) {
  $response["status"] = false;
  $response["message"] = "Address is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["founded"])) {
  $response["status"] = false;
  $response["message"] = "Founded is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["ticketPrice"])) {
  $response["status"] = false;
  $response["message"] = "Ticket price is required";
  echo json_encode($response);
  exit;
}

if (!isset($_POST["userId"])) {
  $response["status"] = false;
  $response["message"] = "User id  is required";
  echo json_encode($response);
  exit;
}

$name = $_POST["name"];

$address = $_POST["address"];

$year = $_POST["founded"];

$seatingCapacity = $_POST["seatingCapacity"];

$price = $_POST["ticketPrice"];

$userId = $_POST["userId"];

try {
  $query = "INSERT INTO theaters(theater_name,location,founded,seating_capacity,ticket_price,user_id) VALUES('$name','$address','$year','$seatingCapacity','$price','$userId')";
  $stmt = $pdo->prepare($query);
  $result = $stmt->execute();

  if ($result) {
    $response["status"] = true;
    $response["message"] = "Theater added";
    echo json_encode($response);
  }
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}
