$(document).ready(function () {
  let userToken = localStorage.getItem("access_token");
  if (userToken) {
    window.location.href = "user.html";
  }

  // nameEl

  let nameBoolean = false;
  $("#nameEl").blur(function () {
    if ($(this).val() === "") {
      $(".nameErr").text("*Please enter name");
    } else if (
      $(this)
        .val()
        .match(/[^A-z]/)
    ) {
      $(".nameErr").text("*Please enter alphabets");
    } else {
      nameBoolean = true;
      $(".nameErr").text("");
    }
  });

  // phoneno
  let phoneNoBoolean=false
  $("#phoneNoEl").blur(function(){
    if (String($(this).val()).length !== 10) {
      $(".phoneNoErr").text("*Phone must contain 10 numbers");
    }
    else {
      phoneNoBoolean = true;
      $(".phoneNoErr").text("");
    }
  })

  // ageEl
  let ageBoolean=false

  $("#ageEl").blur(function(){
    if ($(this).val() === "") {
      $(".ageErr").text("*Please enter age");
    }
    else {
      ageBoolean = true;
      $(".ageErr").text("");
    }
  })

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
    } else if (!($(this).val().match(/[A-Z]/) && $(this).val().match(/[a-z]/) && $(this).val().match(/[0-9]/) && ($(this).val().match(/\W/) || $(this).val().includes("_")))) {
      $(".passwordErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else {
      passwordBoolean = true;
      $(".passwordErr").text("");
    }
  });

  // confirmpasswordEl

  let confirmPasswordBoolean = false;

  $("#confirmPasswordEl").blur(function () {
    if ($(this).val() === "") {
      $(".confirmPasswordErr").text("*Please enter confirmpassword");
    } else if (!($(this).val().match(/[A-Z]/) && $(this).val().match(/[a-z]/) && $(this).val().match(/[0-9]/) && ($(this).val().match(/\W/) || $(this).val().includes("_")))) {
      $(".confirmPasswordErr").text(
        "*Password must be alpha-numeric and specialcharacters"
      );
    } else if ($(this).val() !== $("#passwordEl").val()) {
      $(".confirmPasswordErr").text(
        "*ConfirmPassword must be same as password"
      );
    } else {
      confirmPasswordBoolean = true;
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
    if (!nameBoolean) {
      if (name === "") {
        $(".nameErr").text("*Please enter name");
      }
    }
    if (!phoneNoBoolean) {
      if (String($("#phoneNoEl").val()).length !== 10) {
        $(".phoneNoErr").text("*Phone no must contain 10 numbers");
      }
    }
    if (!emailBoolean) {
      if (email === "") {
        $(".emailErr").text("*Please enter email");
      }
    }if (!ageBoolean) {
      if (age === "") {
        $(".ageErr").text("*Please enter age");
      }
    }
    if (!passwordBoolean) {
      if (password === "") {
        $(".passwordErr").text("*Please enter password");
      }
    }
    if (!confirmPasswordBoolean) {
      if (confirmPassword === "") {
        $(".confirmPasswordErr").text("*Please enter confirmPassword");
      }
    }
    else if (
      nameBoolean &&
      phoneNoBoolean &&
      emailBoolean &&
      passwordBoolean &&
      confirmPasswordBoolean &&
      ageBoolean
    ) {
      $.post(
        "apiconfig/register.php",
        {
          name: name,
          age: age,
          email: email,
          password: password,
          gender:$("input[name=gender]:checked").val(),
          phoneNo:phoneNo
        },
        function (result) {
          console.log(result)
          var result = JSON.parse(result);
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
