$(document).ready(function () {
  var userId = localStorage.getItem("access_token");
  if (userId) {
    window.location.href = "home.html";
  } else {
    // emailEl
    let emailBoolean = false;
    $("#emailEl").blur(function () {
      if ($(this).val() === "") {
        $(".emailErr").text("*Please enter email");
      } else if (
        !$(this)
          .val()
          .match(/\w+@+[A-z]+.com/)
      ) {
        $(".emailErr").text("*Please enter valid email");
      } else {
        emailBoolean = true;
        $(".emailErr").text("");
      }
    });

    // passwordEl

    let passwordBoolean = false;

    $("#passwordEl").blur(function () {
      if ($(this).val() === "") {
        $(".passwordErr").text("*Please enter password");
      } else if (!($(this).val().match(/\w/) && $(this).val().match(/\W/))) {
        $(".passwordErr").text(
          "*Password must be alpha-numeric and specialcharacters"
        );
      } else {
        passwordBoolean = true;
        $(".passwordErr").text("");
      }
    });

    $("#loginBtn").click(function () {
      var email = $("#emailEl").val();
      var password = $("#passwordEl").val();

      if (!emailBoolean) {
        if (email === "") {
          $(".emailErr").text("*Please enter email");
        }
      }
      if (!passwordBoolean) {
        if (password === "") {
          $(".passwordErr").text("*Please enter password");
        }
      } else if (emailBoolean && passwordBoolean) {
        $.post(
          "apiconfig/login.php",
          { email: email, password: password },
          function (result) {
            var result = JSON.parse(result);
            if (!result.status) {
              alert(result.message);
            } else {
              localStorage.setItem("access_token", result.token);
              window.location.replace("home.html");
            }
          }
        );
      }
    });
  }
});
