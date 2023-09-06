function validateForm() {
  var email = $("#emailInput").val();
  var password = $("#passwordInput").val();
  var role = $("#roleInput").val();

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length == 0) {
    $("#emailMessage").html("Enter your email");
    $("#emailMessage").css("color", "red");
  } else if (!emailRegex.test(email)) {
    $("#emailMessage").html("invalid email format");
      $("#emailMessage").css("color", "red");
    return false;
  } else {
    $("#emailMessage").css("display", "none");
  }

  if (password.length == 0) {
    $("#passwordMessage").html("Enter your password");
    $("#passwordMessage").css("color", "red");
  } else if (password.length < 8) {
    $("#passwordMessage").html("Password should be atleast 8 characters long");
    $("#passwordMessage").css("color", "red");
  } else {
    $("#passwordMessage").css("display", "none");
  }

  if (role.length == 0) {
    $("#roleMessage").html("Enter your role");
      $("#roleMessage").css("color", "red");

  } else {
    $("#roleMessage").css("display", "none");

  }
}
  
  $(document).ready(function () {
    $("#submitBtn").click(function () {
      var email = $("#emailInput").val();
      var password = $("#passwordInput").val();
      var role = $("#roleInput").val();
  
      $.post(
        "api/login.php",
        { email: email, password: password, role: role },
        function (result) {
          var result = JSON.parse(result);
          if (!result.status) {
            alert(result.message);
          } else {
         
            if (result.status === true) {
              if (role === "1") {
                window.location.href = "home.html";
              } else if (role === "2") {
                window.location.href = "user.html";
              }
            }
          }
        }
      );
    });
  });
  
  
    