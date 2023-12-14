$(document).ready(function () {
  $(".emailErr").hide();
  $(".emailErr").css({ color: "red", fontSize: "12px" });
  $(".passwordErr").hide();
  $(".passwordErr").css({ color: "red", fontSize: "12px" });

  var emailErrMsg = true;
  var passwordErrMsg = true;

  var accessToken = localStorage.getItem("access_token");
  console.log(window.location.href);
  if (accessToken) {
    window.location.href = "admin.html";
  }

  $("#emailEl").blur(function () {
    var emailVal = $(this).val();
    if (emailVal.length === 0) {
      $(".emailErr").show();
      $(".emailErr").text("*This is a required Field");
    } else if (!emailVal.endsWith(".com") || !emailVal.match(/[@]/)) {
      $(this).val("");
      $(".emailErr").show();
      $(".emailErr").text("Enter Valid Username");
    } else {
      $(".emailErr").hide();
    }
  });

  $("#passwordEl").blur(function () {
    var passwordVal = $(this).val();
    if ($(this).val() === "") {
      $(".passwordErr").show();
      $(".passwordErr").text("*Please enter password");
    } else if (!($(this).val().match(/\w/) && $(this).val().match(/\W/))) {
      $(".passwordErr").show();
      $(".passwordErr").text(
        "*Password must be alpha-numeric and special characters"
      );
    } else {
      $(".passwordErr").hide();
    }
  });

  function validateEmail() {
    var emailValLength = $("#emailEl").val();
    if (emailValLength.length === 0) {
      $(".emailErr").show();
      $(".emailErr").text("*This is a required Field");
      emailErrMsg = true;
    } else if (
      !emailValLength.endsWith(".com") ||
      !emailValLength.match(/[@]/)
    ) {
      $(this).val("");
      $(".emailErr").show();
      $(".emailErr").text("Enter Valid Username");
      emailErrMsg = true;
    } else {
      $(".emailErr").hide();
      emailErrMsg = false;
    }
  }

  function validatePassword() {
    var passwordValLength = $("#passwordEl").val();
    if (passwordValLength.length === 0) {
      $(".passwordErr").show();
      $(".passwordErr").text("*Please enter password");
      passwordErrMsg = true;
    } else if (
      !(passwordValLength.match(/\w/) && passwordValLength.match(/\W/))
    ) {
      $(".passwordErr").show();
      $(".passwordErr").text(
        "*Password must be alpha-numeric and special characters"
      );
      passwordErrMsg = true;
    } else {
      $(".passwordErr").hide();
      passwordErrMsg = false;
    }
  }

  $("#loginBtn").click(function () {
    validateEmail();
    validatePassword();
    if (emailErrMsg === true || passwordErrMsg === true) {
      return true;
    } else {
      var emailEl = $("#emailEl").val();
      var passwordEl = $("#passwordEl").val();
      $.post(
        "./api/login.php",
        { email: emailEl, password: passwordEl },
        function (response) {
          var response = JSON.parse(response);
          console.log(response);
          if (response.status === true) {
            alert(response.message);
            localStorage.setItem("access_token", response.data);
            window.location.replace("admin.html");
          } else {
            alert(response.message);
          }
        }
      ).fail(function (jqXHR, status, error) {
        alert(`Error:${error}`);
      });
    }
  });
});
