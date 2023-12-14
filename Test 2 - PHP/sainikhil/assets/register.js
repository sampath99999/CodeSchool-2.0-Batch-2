$(document).ready(function () {
  let isFormValid = false;
  $("#name").blur(validateName);

  $("#email").blur(validateEmail);
  $("#password").blur(validatePassword);
  $("#confirmPassword").blur(validateConfirmPassword);

  $("#registerBtn").click(function (event) {
    event.preventDefault();

    if (!isFormValid) {
      alert("Please fill out the form correctly.");
    }
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    $.post(
      "./api/register.php",
      {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      function (result) {
        result = JSON.parse(result);
        if (!result.status) {
          alert(result.message);
        } else {
          window.location.replace("./login.html");

          $("#result").text(result.message);
        }
      }
    );
  });
  function updateFormValidity() {
    isFormValid =
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword();
  }

  $("#name, #email, #password, #confirmPassword").blur(updateFormValidity);
});

function validateName() {
  const name = $("#name").val();
  const namePattern = /^[A-Za-z\s]+$/;

  if (namePattern.test(name)) {
    $("#nameLabel").html("Name");
    $("#nameError").text("");

    return true;
  } else {
    $("#nameLabel").text("");
    $("#nameError").text(
      "Invalid name. Please enter alphabetic characters only."
    );
    return false;
  }
}
function validateEmail() {
  const email = $("#email").val();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailPattern.test(email)) {
    $("#emailLabel").html("Name");
    $("#emailError").text("");
    return true;
  } else {
    $("#emailLabel").text("");
    $("#emailError").text(
      "Invalid email address. Please enter a valid email address."
    );
    return false;
  }
}
function validatePassword() {
  const password = $("#password").val();

  if (password.length >= 8) {
    $("#passwordLabel").html("Password");
    $("#passwordError").text("");
    return true;
  } else {
    $("#passwordLabel").text("");
    $("#passwordError").text("Password must be at least 8 characters long.");
    return false;
  }
}
function validateConfirmPassword() {
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  if (password === confirmPassword) {
    $("#confirmPasswordLabel").html("Confirm Password");
    $("#confirmPasswordError").text("");
    return true;
  } else {
    $("#confirmPasswordLabel").text("");
    $("#confirmPasswordError").text(
      "Passwords do not match. Please confirm your password."
    );
    return false;
  }
}
