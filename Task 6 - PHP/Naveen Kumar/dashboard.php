<?php
session_start();

// Check if the user is not logged in, redirect to login page
if (!isset($_SESSION["username"])) {
    header("Location: login.html");
    exit();
}

?>

<!DOCTYPE html>
<html>
<head>
  <title>User Dashboard</title>
  <!-- Include Bootstrap CSS and other stylesheets -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <style>
    img
    {
        height:400px;
        width: 200px;
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
            <a class="navbar-brand order-lg-1 me-auto" href="#">Movie Dashboard</a>
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

      <div class="col-lg-3 mt-4">
        <h3 class="text-center mb-3">AVENGERS</h3>
        
      <?php
      $searchTerm = "avengers"; 
      $$searchTerm = "horror"; // Change this to your desired search term
      $apiKey = "fc1fef96";
      $apiUrl = "https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}";

      $response = file_get_contents($apiUrl);
      $data = json_decode($response, true);

      if (isset($data['Search']) && is_array($data['Search'])) {
        foreach ($data['Search'] as $movie) {
      ?>
          <div class="mb-4 ms-2 mt-2"> 
            <div class="card">
              <img src="<?php echo $movie['Poster']; ?>" class="card-img-top" alt="Movie Image">
              <div class="card-body">
                <h5 class="card-title"><?php echo $movie['Title']; ?></h5>
                <p class="card-text"><strong>Year:</strong> <?php echo $movie['Year']; ?></p>
                <p class="card-text"><strong>IMDb ID:</strong> <?php echo $movie['imdbID']; ?></p>
                <button class="btn btn-primary">
  <a href="movie_details.php?imdbID=<?php echo $movie['imdbID']; ?>" class="text-white text-decoration-none">
    Book Ticket
  </a>
</button>

              </div>
            </div>
          </div>
         
          
        
      <?php
        }
      } else {
        echo "No movies found.";
      }
      ?>
        </div>


        <!----------------------------------->

        <div class="col-lg-3 mt-4">
        <h3 class="text-center mb-3">HORROR</h3>
        
      <?php
    
      $searchTerm = "insidious"; // Change this to your desired search term
      $apiKey = "fc1fef96";
      $apiUrl = "https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}";

      $response = file_get_contents($apiUrl);
      $data = json_decode($response, true);

      if (isset($data['Search']) && is_array($data['Search'])) {
        foreach ($data['Search'] as $movie) {
      ?>
          <div class="mb-4 mt-2"> 
            <div class="card">
              <img src="<?php echo $movie['Poster']; ?>" class="card-img-top" alt="Movie Image">
              <div class="card-body">
                <h5 class="card-title"><?php echo $movie['Title']; ?></h5>
                <p class="card-text"><strong>Year:</strong> <?php echo $movie['Year']; ?></p>
                <p class="card-text"><strong>IMDb ID:</strong> <?php echo $movie['imdbID']; ?></p>
                <button class="btn btn-primary">
  <a href="movie_details.php?imdbID=<?php echo $movie['imdbID']; ?>" class="text-white text-decoration-none">
    Book Ticket
  </a>
</button>

              </div>
            </div>
          </div>
         
          
        
      <?php
        }
      } else {
        echo "No movies found.";
      }
      ?>
        </div>

     <!---------------->

     <div class="col-lg-3 mt-4">
        <h3 class="text-center mb-3">ADVENTURE</h3>
        
      <?php
    
      $searchTerm = "adventure"; // Change this to your desired search term
      $apiKey = "fc1fef96";
      $apiUrl = "https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}";

      $response = file_get_contents($apiUrl);
      $data = json_decode($response, true);

      if (isset($data['Search']) && is_array($data['Search'])) {
        foreach ($data['Search'] as $movie) {
      ?>
          <div class="mb-4 mt-2"> 
            <div class="card">
              <img src="<?php echo $movie['Poster']; ?>" class="card-img-top" alt="Movie Image">
              <div class="card-body">
                <h5 class="card-title"><?php echo $movie['Title']; ?></h5>
                <p class="card-text"><strong>Year:</strong> <?php echo $movie['Year']; ?></p>
                <p class="card-text"><strong>IMDb ID:</strong> <?php echo $movie['imdbID']; ?></p>
                <button class="btn btn-primary">
  <a href="movie_details.php?imdbID=<?php echo $movie['imdbID']; ?>" class="text-white text-decoration-none">
    Book Ticket
  </a>
</button>

              </div>
            </div>
          </div>
         
          
        
      <?php
        }
      } else {
        echo "No movies found.";
      }
      ?>
        </div>

     <!---------------->
      
     <div class="col-lg-3 mt-4 ">
        <h3 class="text-center mb-3">ACTION</h3>
        
      <?php
    
      $searchTerm = "action"; // Change this to your desired search term
      $apiKey = "fc1fef96";
      $apiUrl = "https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}";

      $response = file_get_contents($apiUrl);
      $data = json_decode($response, true);

      if (isset($data['Search']) && is_array($data['Search'])) {
        foreach ($data['Search'] as $movie) {
      ?>
          <div class="mb-4 mt-2"> 
            <div class="card">
              <img src="<?php echo $movie['Poster']; ?>" class="card-img-top" alt="Movie Image">
              <div class="card-body">
                <h5 class="card-title"><?php echo $movie['Title']; ?></h5>
                <p class="card-text"><strong>Year:</strong> <?php echo $movie['Year']; ?></p>
                <p class="card-text"><strong>IMDb ID:</strong> <?php echo $movie['imdbID']; ?></p>
                <button class="btn btn-primary">
  <a href="movie_details.php?imdbID=<?php echo $movie['imdbID']; ?>" class="text-white text-decoration-none">
    Book Ticket
  </a>
</button>

              </div>
            </div>
          </div>
         
          
        
      <?php
        }
      } else {
        echo "No movies found.";
      }
      ?>
        </div>


    </div>
  </div>

  <?php include 'footer.php'; ?>
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
$(document).ready(function() {
  $("#logoutLink").click(function(event) {
    event.preventDefault(); // Prevent default link behavior
    // Redirect to index.php
    window.location.href = "index.php";
  });
});
</script>


  <!---- Include Bootstrap JS and other scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
