<?php
session_start();

// Check if the user is not logged in, redirect to login page
if (!isset($_SESSION["username"])) {
    header("Location: login.html");
    exit();
}

// Check if IMDb ID is provided in the query parameter
if (isset($_GET["imdbID"])) {
    $imdbID = $_GET["imdbID"];
} else {
    header("Location: dashboard.php"); // Redirect to dashboard if IMDb ID is not provided
    exit();
}

// Fetch movie details using OMDB API
$apiKey = "fc1fef96";
$apiUrl = "https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}";

$response = file_get_contents($apiUrl);
$movieDetails = json_decode($response, true);
?>

<!DOCTYPE html>
<html>
<head>
  <title>Movie Details</title>
  <!-- Include Bootstrap CSS and other stylesheets -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  
  <style>
    img {
      height: 500px;
    }
  </style>

</head>
<body>


      
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand order-lg-1 me-auto" href="#">Movie Ticket</a>
            <div class="collapse navbar-collapse order-lg-3" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                <li class="nav-item">
        <a class="nav-link mx-3 text-white" href="dashboard.php">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link mx-3" href="movies.php">Movies</a>
      </li>
      <li class="nav-item">
        <a class="nav-link mx-3" href="logout.php" id="logoutLink" >Logout</a>
      </li>
                </ul>
            </div>
        </div>
    </nav>





  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-lg-6">
        <img src="<?php echo $movieDetails['Poster']; ?>" class="card-img-top" alt="Movie Image">
        <h2 class="text-center mb-3"><?php echo $movieDetails['Title']; ?></h2>
        <h5><strong>Year:</strong> <?php echo $movieDetails['Year']; ?></h5>
        <h5><strong>IMDb ID:</strong> <?php echo $movieDetails['imdbID']; ?></h5>
        <!-- Add more movie details as needed -->
      </div>

      <div class="col-lg-6">
      <form class="booking-form" action="store_booking.php" method="POST" onsubmit="return validateForm()">
  <h4>Book Ticket</h4>
  <div class="mb-3">
    <label for="movieName" class="form-label">Movie Name</label>
    <input type="text" class="form-control" id="movieName" name="movieTitle" value="<?php echo $movieDetails['Title']; ?>" readonly>
  </div>
  <div class="mb-3">
    <label for="screen" class="form-label">Screen</label>
    <input type="text" class="form-control" id="screen" name="screen" value="Demo Screen">
  </div>
  <div class="mb-3">
    <label for="date" class="form-label">Date</label>
    <input type="date" class="form-control" id="date" name="bookingDate">
  </div>
  <div class="mb-3">
    <label for="seats" class="form-label">No. of Seats</label>
    <input type="number" class="form-control" id="seats" name="seatsCount">
  </div>
  <div class="mb-3">
    <label for="amount" class="form-label">Amount</label>
    <input type="text" class="form-control" id="amount" name="totalPrice" readonly>
  </div>

  <div class="mb-3">
  <label class="form-label">Payment Type</label>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="paymentType" id="paymentCounter" value="paymentCounter" checked>
    <label class="form-check-label" for="paymentCounter">
      Payment at Counter
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="paymentType" id="paymentOnline" value="paymentOnline">
    <label class="form-check-label" for="paymentOnline">
      Online Payment
    </label>
  </div>
</div>

<div class="card mb-3" id="onlinePaymentDetails" style="display: none;">
  <div class="card-header">
    Online Payment Details
  </div>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">Card Number</label>
      <input type="text" class="form-control" placeholder="Card Number">
    </div>
    <div class="mb-3">
      <label class="form-label">Expiration Date</label>
      <input type="text" class="form-control" placeholder="Expiration Date">
    </div>
    <div class="mb-3">
      <label class="form-label">CVV</label>
      <input type="text" class="form-control" placeholder="CVV">
    </div>
  </div>
</div>


  <button type="submit" class="btn btn-primary">Book Now</button>
</form>

      </div>
    </div>
  </div>

  <?php include 'footer.php'; ?>

  <!-- Include Bootstrap JS and other scripts -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script>
  $(document).ready(function() {
    const pricePerSeat = 120; // Price per seat in dollars
    const seatsInput = document.getElementById('seats');
    const amountInput = document.getElementById('amount');

    seatsInput.addEventListener('input', function() {
      const seatsCount = parseInt(seatsInput.value, 10);
      const totalPrice = pricePerSeat * seatsCount;
      amountInput.value = totalPrice;
    });

    // Add more validations or adjustments as needed
  });

  const paymentCounter = document.getElementById('paymentCounter');
  const paymentOnline = document.getElementById('paymentOnline');
  const onlinePaymentDetails = document.getElementById('onlinePaymentDetails');

  paymentCounter.addEventListener('click', function() {
    onlinePaymentDetails.style.display = 'none';
  });

  paymentOnline.addEventListener('click', function() {
    onlinePaymentDetails.style.display = 'block';
  });
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

  <script>
function validateForm() {
  // Validate date
  const dateInput = document.getElementById('date');
  if (dateInput.value === '') {
    alert('Please select a date.');
    return false;
  }

  // Validate number of seats
  const seatsInput = document.getElementById('seats');
  if (seatsInput.value === '' || parseInt(seatsInput.value) <= 0) {
    alert('Please enter a valid number of seats.');
    return false;
  }

  // Validate payment option
  const paymentCounter = document.getElementById('paymentCounter');
  const paymentOnline = document.getElementById('paymentOnline');
  if (!paymentCounter.checked && !paymentOnline.checked) {
    alert('Please select a payment option.');
    return false;
  }

  // Validate online payment details
  if (paymentOnline.checked) {
    const cardNumberInput = document.querySelector('#onlinePaymentDetails input[placeholder="Card Number"]');
    const expirationDateInput = document.querySelector('#onlinePaymentDetails input[placeholder="Expiration Date"]');
    const cvvInput = document.querySelector('#onlinePaymentDetails input[placeholder="CVV"]');
    
    const cardNumber = cardNumberInput.value;
    const expirationDate = expirationDateInput.value;
    const cvv = cvvInput.value;

    if (!/^\d{12}$/.test(cardNumber)) {
      alert('Please enter a valid 12-digit card number.');
      return false;
    }

    if (expirationDate === '') {
      alert('Please enter the expiration date.');
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return false;
    }
  }

  return true;
}
</script>

<script>
$(document).ready(function() {
  $("#logoutLink").click(function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Perform any logout-related actions here, if needed

    // Redirect to index.php
    window.location.href = "index.php";
  });
});
</script>



  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
