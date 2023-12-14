let userToken = localStorage.getItem("access_token");
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
  // nameEl
  $(document).ready(function () {
    let isNameVerified = false;
    $("#nameEl").blur(function () {
      if ($(this).val() === "") {
        $(".nameErr").text("*Name is Mandatory");
      } else if (
        $(this)
          .val()
          .match(/^[A-z]+( [A-z]+)*$/)
      ) {
        isNameVerified = true;
        $(".nameErr").text("");
      } else {
        $(".nameErr").text("*Please Enter Alphabets");
      }
    });

    // phoneNoEl
    let isPhoneNoVerified = false;
    $("#phoneNoEl").blur(function () {
      if (String($(this).val()).length !== 10) {
        $(".phoneNoErr").text("*Phone Number Must Contain 10 Digits");
      } else {
        isPhoneNoVerified = true;
        $(".phoneNoErr").text("");
      }
    });

    // ageEl
    let isAgeVerified = false;

    $("#ageEl").blur(function () {
      if ($(this).val() === "") {
        $(".ageErr").text("*Age is Mandatory");
      } else {
        isAgeVerified = true;
        $(".ageErr").text("");
      }
    });

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
          "*Password Must Contain Alpha-Numeric and Special Characters"
        );
      } else {
        isPasswordVerified = true;
        $(".passwordErr").text("");
      }
    });

    // confirmPasswordEl

    let isConfirmPasswordVerified = false;

    $("#confirmPasswordEl").blur(function () {
      if ($(this).val() === "") {
        $(".confirmPasswordErr").text("*Confirm Password is Mandatory");
      } else if (
        !(
          $(this).val().match(/[A-Z]/) &&
          $(this).val().match(/[a-z]/) &&
          $(this).val().match(/[0-9]/) &&
          ($(this).val().match(/\W/) || $(this).val().includes("_"))
        )
      ) {
        $(".confirmPasswordErr").text(
          "*Password Must Contain Alpha-Numeric and Special Characters"
        );
      } else if ($(this).val() !== $("#passwordEl").val()) {
        $(".confirmPasswordErr").text(
          "*Confirm Password Must be Same as Password"
        );
      } else {
        isConfirmPasswordVerified = true;
        $(".confirmPasswordErr").text("");
      }
    });

    // SignupBtn
    $("#signupBtn").click(function () {
      var name = $("#nameEl").val();
      var phoneNo = $("#phoneNoEl").val();
      var email = $("#emailEl").val();
      var age = $("#ageEl").val();
      var password = $("#passwordEl").val();
      var confirmPassword = $("#confirmPasswordEl").val();
      if (!isNameVerified) {
        if (name === "") {
          $(".nameErr").text("*Name is Mandatory");
        }
      }
      if (!isPhoneNoVerified) {
        if (String($("#phoneNoEl").val()).length !== 10) {
          $(".phoneNoErr").text("*Phone Number Must Contain 10 Digits");
        }
      }
      if (!isEmailVerified) {
        if (email === "") {
          $(".emailErr").text("*Email is Mandatory");
        }
      }
      if (!isAgeVerified) {
        if (age === "") {
          $(".ageErr").text("*Age is Mandatory");
        }
      }
      if (!isPasswordVerified) {
        if (password === "") {
          $(".passwordErr").text("*Password is Mandatory");
        }
      }
      if (!isConfirmPasswordVerified) {
        if (confirmPassword === "") {
          $(".confirmPasswordErr").text("*Confirm Password is Mandatory");
        }
      } else if (
        isNameVerified &&
        isPhoneNoVerified &&
        isEmailVerified &&
        isPasswordVerified &&
        isConfirmPasswordVerified &&
        isAgeVerified
      ) {
        $.post(
          "apiConfig/register.php",
          {
            name: name,
            age: age,
            email: email,
            password: password,
            gender: $("input[name=gender]:checked").val(),
            phoneNo: phoneNo,
          },
          function (result) {
            var result = JSON.parse(result);
            if (!result.status) {
              alert(result.message);
            } else {
              window.location.replace("login.html");
            }
          }
        ).fail(function (jqXHR, statusText, errorThrown) {
          console.error("error: " + errorThrown);
        });
      }
    });
  });
}
