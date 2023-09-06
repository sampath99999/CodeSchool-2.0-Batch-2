var userToken = localStorage.getItem("access_token");
if (userToken) {
  $.get("apiConfig/userDetails.php", { token: userToken }, function (result) {
    var result = JSON.parse(result);
    if (result["status"]) {
      window.location.replace("./");
    } else {
      localStorage.removeItem("access_token");
      window.location.replace("login.html");
    }
  }).fail(function (jqXHR, statusText, errorThrown) {
    console.error("error: " + errorThrown);
  });
} else {
  $(document).ready(function () {
    // emailEl
    let isEmailVerified = false;
    $("#emailEl").blur(function () {
      if ($(this).val() === "") {
        $(".emailErr").text("*Email is Mandatory");
      } else if (
        !$(this)
          .val()
          .match(/\w+@+[A-z]+.com/)
      ) {
        $(".emailErr").text("*Email is Not Valid");
      } else {
        isEmailVerified = true;
        $(".emailErr").text("");
      }
    });

    // passwordEl

    let isPasswordVerified = false;

    $("#passwordEl").blur(function () {
      if ($(this).val() === "") {
        $(".passwordErr").text("*Password is Mandatory");
      } else if (
        !(
          $(this).val().match(/[A-Z]/) &&
          $(this).val().match(/[a-z]/) &&
          $(this).val().match(/[0-9]/) &&
          ($(this).val().match(/\W/) || $(this).val().includes("_"))
        )
      ) {
        $(".passwordErr").text(
          "*Password Must be Alpha-Numeric and Special Characters"
        );
      } else {
        isPasswordVerified = true;
        $(".passwordErr").text("");
      }
    });

    $("#loginBtn").click(function () {
      var email = $("#emailEl").val();
      var password = $("#passwordEl").val();

      if (!isEmailVerified) {
        if (email === "") {
          $(".emailErr").text("*Email is Mandatory");
        }
      }
      if (!isPasswordVerified) {
        if (password === "") {
          $(".passwordErr").text("*Password is Mandatory");
        }
      } else if (isEmailVerified && isPasswordVerified) {
        $.post(
          "apiConfig/login.php",
          { email: email, password: password },
          function (result) {
            var result = JSON.parse(result);
            if (!result["status"]) {
              alert(result["message"]);
            } else {
              localStorage.setItem("access_token", result.token);
              if (result["status"]) {
                window.location.replace("./");
              }
            }
          }
        ).fail(function (jqXHR, statusText, errorThrown) {
          console.error("error: " + errorThrown);
        });
      }
    });
  });
}
