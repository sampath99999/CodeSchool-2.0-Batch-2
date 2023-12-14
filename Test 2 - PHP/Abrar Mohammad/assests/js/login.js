$(document).ready(function () {
  $(".emailErr").hide();
  $(".emailErr").css({ color: "red", fontSize: "12px" });
  $(".passwordErr").hide();
  $(".passwordErr").css({ color: "red", fontSize: "12px" });

  var emailErrMsg = true;
  var passwordErrMsg = true;

  var accessToken = localStorage.getItem("access_token");
  console.log(accessToken);
  if (accessToken) {
    window.location.href = "home.html";
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
        "*Password must be alpha-numeric and specialcharacters"
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
    if (passwordValLength === 0) {
      $(".passwordErr").show();
      $(".passwordErr").text("*Please enter password");
    } else if (
      !(passwordValLength.match(/\w/) && passwordValLength.match(/\W/))
    ) {
      $(".passwordErr").show();
      $(".passwordErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else {
      $(".passwordErr").hide();
    }
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  $("#loginBtn").click(function () {
    // validateEmail();
    // validatePassword();
    // if (emailErrMsg === true || passwordErrMsg === true) {
    //   return true;
    // } else {

    // }
    var emailEl = $("#emailEl").val();
    var passwordEl = $("#passwordEl").val();
    $.post(
      "http://localhost/donations/apiconfig/login.php",
      { email: emailEl, password: passwordEl },
      function (response) {
        var response = JSON.parse(response);
        console.log(response);
        if (response.status === true) {
          alert(response.message);
          localStorage.setItem("access_token", response.data);
          window.location.href = "home.html";
        } else {
          alert(response.message);
        }
      }
    );
  });
});
