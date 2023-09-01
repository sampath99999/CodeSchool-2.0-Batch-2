$(document).ready(function () {
  let userToken = localStorage.getItem("access_token");
  if (userToken) {
    window.location.href = "home.html";
  }

  // firstnameEl

  let firstnameBoolean = false;
  $("#firstnameEl").blur(function () {
    if ($(this).val() === "") {
      $(".firstnameErr").text("*Please enter firstname");
    } else if (
      $(this)
        .val()
        .match(/[^A-z]/)
    ) {
      $(".firstnameErr").text("*Please enter alphabets");
    } else {
      firstnameBoolean = true;
      $(".firstnameErr").text("");
    }
  });

  // lastnameEl

  let lastnameBoolean = false;
  $("#lastnameEl").blur(function () {
    if ($(this).val() === "") {
      $(".lastnameErr").text("*Please enter lastname");
    } else if (
      $(this)
        .val()
        .match(/[^A-z]/)
    ) {
      $(".lasttnameErr").text("*Please enter alphabets");
    } else {
      lastnameBoolean = true;
      $(".lastnameErr").text("");
    }
  });

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

  // confirmpasswordEl

  let confirmpasswordBoolean = false;

  $("#confirmpasswordEl").blur(function () {
    if ($(this).val() === "") {
      $(".confirmpasswordErr").text("*Please enter confirmpassword");
    } else if (!($(this).val().match(/\w/) && $(this).val().match(/\W/))) {
      $(".confirmpasswordErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else if ($(this).val() !== $("#passwordEl").val()) {
      $(".confirmpasswordErr").text(
        "*Confirmpassword must be same as password"
      );
    } else {
      confirmpasswordBoolean = true;
      $(".confirmpasswordErr").text("");
    }
  });

  // SignupBtn
  $("#signupBtn").click(function () {
    var firstname = $("#firstnameEl").val();
    var lastname = $("#lastnameEl").val();
    var email = $("#emailEl").val();
    var password = $("#passwordEl").val();
    var confirmpassword = $("#confirmpasswordEl").val();
    if (!firstnameBoolean) {
      if (firstname === "") {
        $(".firstnameErr").text("*Please enter firstname");
      }
    }
    if (!lastnameBoolean) {
      if (lastname === "") {
        $(".lastnameErr").text("*Please enter lastname");
      }
    }
    if (!emailBoolean) {
      if (email === "") {
        $(".emailErr").text("*Please enter email");
      }
    }
    if (!passwordBoolean) {
      if (password === "") {
        $(".passwordErr").text("*Please enter password");
      }
    }
    if (!confirmpasswordBoolean) {
      if (confirmpassword === "") {
        $(".confirmpasswordErr").text("*Please enter confirmpassword");
      }
    }
    else if (
      firstnameBoolean &&
      lastnameBoolean &&
      emailBoolean &&
      passwordBoolean &&
      confirmpasswordBoolean 
    ) {
      $.post(
        "apiconfig/register.php",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        },
        function (result) {
          console.log(result);
          var result = JSON.parse(result);
          console.log(result);
          if (!result.status) {
            alert(result.message);
          } else {
            window.location.replace("login.html");
          }
        }
      );
    }
  });
});
