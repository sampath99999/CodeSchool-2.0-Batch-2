$(document).ready(() => {

    $(document).ready(function() {
        const randomImage = $('#random-image');
        
        function fetchRandomImage() {
          const imageUrl = `https://picsum.photos/800?random=${Math.random()}`;
          randomImage.attr('src', imageUrl);
        }
      
        // Load a new random image when the page loads
        fetchRandomImage();
      });
      
    

    $("#registerForm").click(function(){
        $("#loginForm").html(`<form action="#"  method="get" onsubmit="return false;">
        <div class="first row">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              required
            />
          </div>
        </div>
        <div class="second row my-4">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              required
            />
          </div>
        </div>
        <div class="third row my-4">
          <div class="form-group col-6">
            <label for="birthday">Birthday</label>
            <input
              type="date"
              class="form-control"
              id="birthday"
              required
            />
          </div>
          <div class="form-group col-6">
              <label for="phone">Phone no.</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                required
              />
        </div>
        <div class="form-group fourth my-4">
          <label for="confirm-password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            required
          />
        </div>
      
      
        <div class="form-group last mb-4">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="Confirmpassword"
            required
          />
        </div>
      
        <!-- <div class="d-flex mb-5 align-items-center">
          <span
            ><a href="#" class="forgot-pass">Forgot Password</a></span
          >
        </div> -->
      
        <div class="row ms-0">
          <!-- <input type="submit" value="Log In" class="btn btn-block btn-primary"> -->
        <button class="btn btn-block btn-primary " id="registrationBtn" style="background-color: black; border-color: black;">
          Register
        </button>
        </div>
        </form>`)

        $("#registrationBtn").click(function(){
            const name = $("#name").val();
            const email = $("#email").val();
            const password = $("#password").val();
            const confirmPassword = $("#confirmPassword").val();
            const phone = $("#phone").val();
            const dateofBirth = $("#dateOfBirth").val();
        
            // Validate name (only letters and spaces)
            const ValidName = /^[A-Za-z\s]+$/;
            if (!name.match(ValidName)) {
            $("#nameError").text("Name should contain only letters and spaces.");
            return;
            }
        
            // Validate email format
            const ValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.match(ValidEmail)) {
            $("#emailError").text("Invalid email format.");
            return;
            }
        
            // Validate password length
            if (password.length < 8) {
            $("#passwordError").text("Password should be at least 8 characters long.");
            return;
            }
        
            // Validate password and confirm password match
            if (password !== confirmPassword) {
            $("#confirmPasswordError").text("Passwords do not match.");
            return;
            }
        
            // Validate phone number (only digits, optional + sign)
            const ValidPhone = /^(\+?\d{1,3})?[-.\s]?\d{3,}$/;
            if (!phone.match(ValidPhone)) {
            $("#phoneError").text("Invalid phone number format.");
            return;
            }
        
            // Validate date of birth (optional)
            if (dateofBirth) {
            const BirthDate = new Date(dateofBirth);
            const currentDate = new Date();
            if (BirthDate >= currentDate) {
                $("#dateOfBirthError").text("Invalid date of birth.");
                return;
            }
            }
        
            // If all validations passed, submit the form
            alert("Registration successful!");
       });

    });

       


       $("#loginBtn").click(function(){
            const name = $("#name").val();
            const password = $("#password").val();

            // Validate name (only letters and spaces)
            const ValidName = /^[A-Za-z\s]+$/;
            if (!name.match(ValidName)) {
                $("#nameError").text("Name should contain only letters and spaces.");
                return;
            }

            if (password.length < 8) {
                $("#passwordError").text("Password should be at least 8 characters long.");
                return;
            }

            alert("Login Successful!")
       });

        // Clear any previous error messages
        
      
        
      
        
        // You can uncomment the line below to actually submit the form
        // $("#registrationForm")[0].submit();


   
      
});