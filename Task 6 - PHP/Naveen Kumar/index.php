<!DOCTYPE html>
<html>
<head>
  <title>Movie Ticket Booking</title>
  <!-- Include Bootstrap CSS and jQuery -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
 
  <style>
  
  .bg-image {
        background-image: url('https://wallpapercave.com/wp/wp4016031.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color:whitesmoke;
    }

    .text{
           
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
            padding: 20px; /* Add padding for better visibility */
            color: white; /* Text color */
            text-align: center;
            position: absolute; /* Position the container absolutely within the section */
            top: 50%; /* Center vertically */
            left: 50%; /* Center horizontally */
            transform: translate(-50%, -50%); /* Adjust for exact centering */
           
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
            <a class="navbar-brand order-lg-1 me-auto" href="#">Movie Booking System</a>
            <div class="collapse navbar-collapse order-lg-3" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white mx-3" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link mx-3" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link mx-3" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                    </li>
                    <li class="nav-item">
                        <a id="about-link " class="nav-link mx-3" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a id="contact-link " class="nav-link mx-3" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Content Section -->
    <section class="bg-image">
        <div class="container">
            <div class="row">
                <div class="col-12 text">
                    <h2>Welcome to the Movie Booking System</h2>
                    <p>Book your favorite movies, enjoy with friends and family!</p>
                </div>
            </div>
        </div>
    </section>

    <?php include 'Carousel.php'; ?>







 <!-- Register Modal -->

 <div class="modal fade" id="registerModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" ></button>
      </div>
      <div class="modal-body">
        <form id="registrationForm" method="post" action="register.php">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" required>
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input type="number" class="form-control" id="age" name="age" required>
          </div>
          <div class="mb-3">
            <label class="form-check-label">Gender</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gender" id="genderMale" value="male" required>
              <label class="form-check-label" for="genderMale">Male</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="female">
              <label class="form-check-label" for="genderFemale">Female</label>
            </div>
          </div>
          <div class="mb-3">
            <label for="mobile" class="form-label">Mobile Number</label>
            <input type="text" class="form-control" id="mobile" name="mobile" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</div>




 
          <!-- Login Modal -->
<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">Login</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </button>
      </div>
      <div class="modal-body">
        <form id="loginForm" method="post" action="login.php">
          <div class="mb-3">
            <label for="loginEmail" class="form-label">Email address</label>
            <input type="email" class="form-control" id="loginEmail" name="loginEmail" required>
          </div>
          <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="loginPassword" name="loginPassword" required>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</div>



<!-- Your page content goes here -->

  <!-- Include Bootstrap JS -->
<section id="footer">
<?php include 'footer.php'; ?>
</section>
  
  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>

  

<script>
        $(document).ready(function () {
            $("#about-link").click(function () {
                $('html, body').animate({
                    scrollTop: $("#footer").offset().top
                }, 1000);
            });

            $("#contact-link").click(function () {
                $('html, body').animate({
                    scrollTop: $("#footer").offset().top
                }, 1000);
            });
        });
    </script>

 

</body>
</html>
