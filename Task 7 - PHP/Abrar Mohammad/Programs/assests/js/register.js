$(document).ready(function () {
  var userToken = localStorage.getItem("access_token");
  console.log(userToken);
  if (userToken) {
    window.location.href = "home.html";
  }

  $(".firstName").hide();
  $(".firstName").css({ color: "red", fontSize: "10px" });
  $(".lastName").hide();
  $(".lastName").css({ color: "red", fontSize: "10px" });
  $(".emailErrMsg").hide();
  $(".emailErrMsg").css({ color: "red", fontSize: "10px" });
  $(".passErr").hide();
  $(".passErr").css({ color: "red", fontSize: "10px" });
  $(".cPassErr").hide();
  $(".cPassErr").css({ color: "red", fontSize: "10px" });

  let firstNameErr = true;
  let emailErr = true;
  let lastNameErr = true;
  let passwordErr = true;
  let cPasswordErr = true;

  $("#userName").blur(function (event) {
    if (event.target.value === "") {
      $(".firstName").show();
      $(".firstName").text("Enter FirstName");
    } else if (event.target.value.match(/[^A-z]/)) {
      $(this).val("");
      $(".firstName").show();
      $(".firstName").text("Enter Valid Username");
    } else {
      $(".firstName").hide();
    }
  });

  $("#lastName").blur(function (event) {
    if (event.target.value === "") {
      $(".lastName").show();
      $(".lastName").text("Enter last Name");
    } else if (event.target.value.match(/[^A-z]/)) {
      $(this).val("");
      $(".lastName").show();
      $(".lastName").text("Enter Valid Username");
    } else {
      $(".lastName").hide();
    }
  });

  $(".email").blur(function (event) {
    if (event.target.value === "") {
      $(".emailErrMsg").show();
      $(".emailErrMsg").text("Enter Email");
    } else if (
      !event.target.value.endsWith(".com") ||
      !event.target.value.match(/[@]/)
    ) {
      $(this).val("");
      $(".emailErrMsg").show();
      $(".emailErrMsg").text("Enter Valid Username");
    } else {
      $(".emailErrMsg").hide();
    }
  });

  $("#password").blur(function () {
    if ($(this).val() === "") {
      $(".passErr").show();
      $(".passErr").text("*Please enter confirmpassword");
    } else if (!($(this).val().match(/\w/) && $(this).val().match(/\W/))) {
      $(".passErr").show();
      $(".passErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else {
      $(".passErr").hide();
    }
  });

  $("#confirmPassword").blur(function () {
    if ($(this).val() === "") {
      $(".cPassErr").show();
      $(".cPassErr").text("*Please enter confirm password");
    } else if (!($(this).val().match(/\w/) && $(this).val().match(/\W/))) {
      $(".cPassErr").show();
      $(".cPassErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else {
      $(".cPassErr").hide();
    }
  });

  function validateUser() {
    let userVal = $("#userName").val();
    if (userVal.length === 0) {
      $(".firstName").show();
      firstNameErr = true;
    } else {
      $(".firstName").hide();
      firstNameErr = false;
    }
  }

  function validateLastName() {
    let userVal = $("#lastName").val();
    if (userVal.length === 0) {
      $(".lastName").show();
      lastNameErr = true;
    } else {
      $(".lastName").hide();
      lastNameErr = false;
    }
  }

  function validateEmail() {
    let emailVal = $("#email").val();
    if (emailVal.length === 0) {
      $(".emailErrMsg").show();
      emailErr = true;
    } else {
      $(".emailErrMsg").hide();
      emailErr = false;
    }
  }
  function validatePassword() {
    let password = $("#password").val();
    if (password.length === 0) {
      $(".passErr").show();
      passwordErr = true;
    } else {
      $(".passErr").hide();
      passwordErr = false;
    }
  }
  function validateConfirmPassword() {
    let confirmPassword = $("#confirmPassword").val();
    if (confirmPassword.length === 0) {
      $(".cPassErr").show();
      cPasswordErr = true;
    } else {
      $(".cPassErr").hide();
      cPasswordErr = false;
    }
  }

  $("#submitBtn").click(function () {
    validateUser();
    validateEmail();
    validateLastName();
    validatePassword();
    validateConfirmPassword();
    if (
      firstNameErr === true ||
      lastNameErr === true ||
      emailErr === true ||
      passwordErr === true ||
      cPasswordErr === true
    ) {
      return true;
    } else {
      var firstName = $("#userName").val();
      var lastName = $("#lastName").val();
      var email = $("#email").val();
      var password = $("#password").val();
      $.post(
        "http://localhost/programs/apiconfig/register.php",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        function (result) {
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
