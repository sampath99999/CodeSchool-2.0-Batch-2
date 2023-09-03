$(document).ready(function () {
  let userToken = localStorage.getItem("access_token");
  if (userToken) {
    window.location.href = "home.html";
  }

  $(".emailErr").hide();
  $(".emailErr").css({ fontSize: "12px", color: "red" });
  $(".passwordErr").hide();
  $(".passwordErr").css({ fontSize: "12px", color: "red" });

  var emailErrMsg = true;
  var passwordErrMsg = true;

  $("#emailEl").blur(function (event) {
    if (event.target.value === "") {
      $(".emailErr").show();
      $(".emailErr").text("*Enter email");
    } else if (
      !event.target.value.endsWith(".com") ||
      !event.target.value.match(/[@]/)
    ) {
      $(this).val("");
      $(".emailErr").show();
      $(".emailErr").text("*Enter valid email");
    } else {
      $(".emailErr").hide();
    }
  });

  $("#passwordEl").blur(function () {
    if ($(this).val() === "") {
      $(".passwordErr").show();
      $(".passwordErr").text("*Please enter password");
    } else if (!($(this).val().match(/\w/) && $(this).val().match(/\W/))) {
      $(".passwordErr").show();
      $(".passwordErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else {
      $(".passwordErr").hide();
    }
  });

  function validateEmail() {
    var emailEl = $("#emailEl").val();
    if (emailEl.length === 0) {
      $(".emailErr").show();
      emailErrMsg = true;
    } else {
      $(".emailErr").hide();
      emailErrMsg = false;
    }
  }

  function validatePassword() {
    var passwordEl = $("#passwordEl").val();
    if (passwordEl.length === 0) {
      $(".passwordErr").show();
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
      var email = $("#emailEl").val();
      var password = $("#passwordEl").val();
      $.post(
        "http://localhost/programs/apiconfig/login.php",
        { email: email, password: password },
        function (result) {
          var result = JSON.parse(result);
          if (!result.status) {
            alert(result.message);
          } else {
            localStorage.setItem("access_token", result.data);
            window.location.href = "home.html";
          }
        }
      );
    }
  });
});
