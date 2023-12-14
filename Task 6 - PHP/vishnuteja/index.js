$(document).ready(function () {
  var userToken = localStorage.getItem("token");
  console.log("token is :", userToken);
  if (userToken != null) {
    window.location.replace("home.html");
  }
});

let email, password, validEmail, validPassword;

const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let emailErrorMessage = $("#emailErrorMessage");
let passwordErrorMessage = $("#passwordErrorMessage");
let loginErrorMessage = $("#loginErrorMessage");

function login() {
  email = $("#emailInput").val();
  password = $("#inputPassword").val();

  // Email Validation

  if (email.length == 0) {
    validEmail = false;
    emailErrorMessage.text("Please Enter Email!");
  } else if (email.length > 0 && !email.match(emailformat)) {
    validEmail = false;
    emailErrorMessage.text("Email is not in a valid format!");
  } else {
    validEmail = true;
    emailErrorMessage.text("");
  }

  // Passowrd validation

  if (password.length == 0) {
    validPassword = false;
    passwordErrorMessage.text("Please Enter Password!");
  } else {
    validPassword = true;
    passwordErrorMessage.text("");
  }

  if (validEmail && validPassword) {
    $.post(
      "api/login.php",
      { email: email, password: password },
      function (result) {
        console.log(result);
        var result = JSON.parse(result);
        console.log(result);
        if (!result.status) {
          loginErrorMessage.text("Invalid credentials!");
        } else {
          loginErrorMessage.text("login success!");
          localStorage.setItem("token", result.data);
          window.location.replace("home.html");
        }
      }
    );
  }
}
