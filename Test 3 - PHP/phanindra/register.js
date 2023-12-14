$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (userId) {
    window.location.replace("home.html");
  }

  var firstnameValidate;
  var lastnameValidate;
  var emailValidate;
  var numberValidate;
  var passwordValidate;
  var confirmPasswordValidate;

  $("#numberInput").on("input", function () {
    $(this).val($(this).val().replace(/[e.]/gi, ""));
  });

  $("#submitBtn").click(function () {
    var firstname = $("#firstnameInput").val();
    var lastname = $("#lastnameInput").val();
    var number = $("#numberInput").val();
    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();
    var confirmPassword = $("#confirmPasswordInput").val();

    const alphabeticRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (firstname.length < 2 || firstname.length > 50) {
      $("#firstNameErrorText").text("*Must be between 2 and 50 charecters");
      firstnameValidate = false;
    } else if (!alphabeticRegex.test(firstname)) {
      $("#firstNameErrorText").text("*Please enter alphabetic charecters");
      firstnameValidate = false;
    } else {
      firstnameValidate = true;
    }

    if (lastname.length < 2 || lastname.length > 50) {
      $("#lastNameErrorText").text("*Must be between 2 and 50 charecters");
      lastnameValidate = false;
    } else if (!alphabeticRegex.test(lastname)) {
      $("#lastNameErrorText").text("*Please enter alphabetic charecters");
      lastnameValidate = false;
    } else {
      lastnameValidate = true;
    }

    if (email === "") {
      $("#emailErrorText").text("*Must not be empty");
      emailValidate = false;
    } else if (!emailRegex.test(email)) {
      $("#emailErrorText").text("*Email is not valid");
      emailValidate = false;
    } else {
      emailValidate = true;
    }

    if (password === "") {
      $("#passwordErrorMsg").text("*Password must not be empty");
      passwordValidate = false;
    } else if (password.length < 8) {
      $("#passwordErrorMsg").text(
        "*Password must be at least 8 characters long."
      );
      passwordValidate = false;
    } else if (!/[A-Z]/.test(password)) {
      $("#passwordErrorMsg").text(
        "*Password must contain at least one uppercase letter."
      );
      passwordValidate = false;
    } else if (!/[a-z]/.test(password)) {
      $("#passwordErrorMsg").text(
        "*Password must contain at least one lowercase letter."
      );
      passwordValidate = false;
    } else if (!/[0-9]/.test(password)) {
      $("#passwordErrorMsg").text("*Password must contain at least one digit");
      passwordValidate = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      $("#passwordErrorMsg").text(
        "Password must contain at least one special character (!@#$%^&*)."
      );
      passwordValidate = false;
    } else {
      passwordValidate = true;
    }

    if (confirmPassword === "") {
      $("#confirmPasswordErrorMsg").text("*Password must not be empty");
      confirmPasswordValidate = false;
    } else if (confirmPassword !== confirmPassword) {
      $("#confirmPasswordErrorMsg").text("Passwords do not match.");
      confirmPasswordValidate = false;
    } else {
      confirmPasswordValidate = true;
    }

    if (number === "") {
      $("#numberErrorMsg").text("*Number must not be empty");
      numberValidate = false;
    } else if (!numValidation(number)) {
      $("#numberErrorMsg").text("*Please enter valid phone number");
      numberValidate = false;
    } else {
      numberValidate = true;
    }

    function numValidation() {
      const numbericNumber = number.replace(/\D/g, "");

      if (numbericNumber.length !== 10) {
        return false;
      }
      return true;
    }

    if (
      firstnameValidate &&
      lastnameValidate &&
      emailValidate &&
      numberValidate &&
      passwordValidate &&
      confirmPasswordValidate
    ) {
      $.post(
        "api/register.php",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          number: number,
          password: password,
          confirmPassword: confirmPassword,
        },
        function (result) {
          var result = JSON.parse(result);
          if (!result.status) {
            alert(result.message);
          } else {
            window.location.replace("login.html");
            $("#result").text(result.message);
          }
        }
      );
    }
  });
});
