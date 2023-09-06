function validateForm() {
  var name = $("#nameInput").val();
  var email = $("#emailInput").val();
  var password = $("#passwordInput").val();
  var confirmPassword = $("#confirmPasswordInput").val();
  var role = $("#roleInput").val();
  var isValid = true;

  if (name.length == 0) {
    $("#nameMessage").html("Enter your name");
    $("#nameMessage").css("color", "red");
    isValid = false;
  } else {
    $("#nameMessage").css("display", "none");
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length == 0) {
    $("#emailMessage").html("Enter your email");
    $("#emailMessage").css("color", "red");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    $("#emailMessage").html("Invalid email format");
    $("#emailMessage").css("color", "red");
    isValid = false;
  } else {
    $("#emailMessage").css("display", "none");
  }

  if (password.length == 0) {
    $("#passwordMessage").html("Enter your password");
    $("#passwordMessage").css("color", "red");
    isValid = false;
  } else if (password.length < 8) {
    $("#passwordMessage").html("Password should be at least 8 characters long");
    $("#passwordMessage").css("color", "red");
    isValid = false;
  } else {
    $("#passwordMessage").css("display", "none");
  }

  if (confirmPassword !== password) {
    $("#confirmpasswordMessage").html("Password doesn't match");
    $("#confirmpasswordMessage").css("color", "red");
    isValid = false;
  } else {
    $("#confirmpasswordMessage").html("Password matched");
    $("#confirmpasswordMessage").css("color", "green");
  }

  if (role.length == 0) {
    $("#roleMessage").html("Enter your role");
    $("#roleMessage").css("color", "red");
    isValid = false;
  } else {
    $("#roleMessage").css("display", "none");
  }

  return isValid;
}

$(document).ready(function () {
  $("#submitBtn").click(function () {
    if (validateForm()) {
      var name = $("#nameInput").val();
      var email = $("#emailInput").val();
      var password = $("#passwordInput").val();
      var confirmPassword = $("#confirmPasswordInput").val();
      var role = $("#roleInput").val();

      $.post(
        "api/register.php",
        {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          role: role,
        },
        function (result) {
          console.log(result);
          var result = JSON.parse(result);

          if (!result.status) {
            alert(result.message);
          } else {
            window.location.href = "login.html";
          }
        }
      );
    }
  });
});
