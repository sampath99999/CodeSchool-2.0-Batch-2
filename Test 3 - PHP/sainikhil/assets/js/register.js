$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (userId) {
    window.location.replace("dashboard.html");
  }
  $("#loginBtn").click(function (e) {
    e.preventDefault();
    window.location.replace("./login.html");
  });

  function validateName() {
    const nameInput = $("#name");
    const nameLabel = $("#nameLabel");
    const nameError = $("#nameError");
    const name = nameInput.val().trim();
    const namePattern = /^[A-Za-z]+$/;

    if (name === "") {
      nameLabel.addClass("text-danger");
      nameError.text("Name is required");
      return false;
    } else if (!name.match(namePattern)) {
      nameLabel.addClass("text-danger");
      nameError.text("Name should contain only alphabetic characters");
      return false;
    } else {
      nameLabel.removeClass("text-danger");
      nameError.text("");
      return true;
    }
  }

  function validateEmail() {
    const emailInput = $("#email");
    const emailLabel = $("#emailLabel");
    const emailError = $("#emailError");
    const email = emailInput.val().trim();

    if (email === "") {
      emailLabel.removeClass("text-danger");
      emailError.text("");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailLabel.addClass("text-danger");
      emailError.text("Invalid email address");
      return false;
    } else {
      emailLabel.removeClass("text-danger");
      emailError.text("");
      return true;
    }
  }

  function validatePassword() {
    const passwordInput = $("#password");
    const passwordLabel = $("#passwordLabel");
    const passwordError = $("#passwordError");
    const password = passwordInput.val().trim();

    if (password === "") {
      passwordLabel.removeClass("text-danger");
      passwordError.text("");
    } else if (password.length < 8) {
      passwordLabel.addClass("text-danger");
      passwordError.text("Password must be at least 8 characters long");
      return false;
    } else {
      passwordLabel.removeClass("text-danger");
      passwordError.text("");
      return true;
    }
  }

  function validateConfirmPassword() {
    const confirmPasswordInput = $("#confirmPassword");
    const confirmPasswordLabel = $("#confirmPasswordLabel");
    const confirmPasswordError = $("#confirmPasswordError");
    const confirmPassword = confirmPasswordInput.val().trim();
    const password = $("#password").val().trim();

    if (confirmPassword === "") {
      confirmPasswordLabel.removeClass("text-danger");
      confirmPasswordError.text("");
    } else if (confirmPassword !== password) {
      confirmPasswordLabel.addClass("text-danger");
      confirmPasswordError.text("Passwords do not match");
      return false;
    } else {
      confirmPasswordLabel.removeClass("text-danger");
      confirmPasswordError.text("");
      return true;
    }
  }

  function enableRegisterButton() {
    const registerBtn = $("#registerBtn");
    const isNameValid = validateName();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      registerBtn.prop("disabled", false);
    } else {
      registerBtn.prop("disabled", true);
    }
  }

  $("#name, #email, #password, #confirmPassword").on(
    "input",
    enableRegisterButton
  );
  $("#registerBtn").click(function (e) {
    e.preventDefault();
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
        console.log(result);
        result = JSON.parse(result);
        if (result.status) {
          alert(result.message);
          window.location.replace("./login.html");
        } else {
          alert(result.message);
        }
      }
    ).fail(function (xhr, status, error) {
      alert("An error occurred: " + error);
    });
  });
});
