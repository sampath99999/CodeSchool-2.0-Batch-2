$(function () {
  validateName = () => {
    var username = $("#name").val();

    if (username === "") {
      $("#username-error").text("*Name must not be Empty");

      return false;
      //username.match(/^[a-zA-Z][a-zA-Z\\s]+$/) ||
    } else if (username.match(/[^A-z]/)) {
      $("#username-error").text("*Username must contain only alphabets");
      $("#name").val("");

      return false;
    } else {
      $("#username-error").text("");
      return true;
    }
  };

  validateEmailAddress = () => {
    var email = $("#email").val();

    if (email === "") {
      $("#email-error").text("*Email must not be Empty");
      return false;
    } else if (!email.endsWith(".com") || !email.match(/[@]/)) {
      $("#email-error").text("*Enter a valid Email ID");
      return false;
    } else {
      $("#email-error").text("");
      return true;
    }
  };

  validateCompanyname = () => {
    var companyName = $("#companyName").val();

    if (companyName === "") {
      $("#company-error").text("*Company Name must not be Empty");

      return false;
    } else if (companyName.match(/[^A-z]/)) {
      $("#company-error").text("*Company Name must contain only alphabets");
      $("#companyName").val("");

      return false;
    } else {
      $("#company-error").text("");
      return true;
    }
  };
  function validatePassword() {
    var password = $("#password").val();
    var regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length === 0) {
      $("#password-error").text("*Password must not be Empty");
      return false;
    } else if (!regex.test(password)) {
      console.log(password.match(regex));
      $("#password-error").text("*Enter a Valid Password");
      return false;
    } else {
      $("#password-error").text("");
      return true;
    }
  }

  function validateConfirmPassword() {
    var confirmpassword = $("#confirmPassword").val();
    var password = $("#password").val();
    var regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (confirmpassword.length === 0) {
      $("#confirm-password-error").text("*Password must not be Empty");
      return false;
    } else if (!regex.test(confirmpassword)) {
      $("#password-error").text("*Enter a Valid Password");
      return false;
    } else if (password != confirmpassword) {
      console.log(password);
      console.log(confirmpassword);
      $("#confirm-password-error").text("*Password did not Match");
      return false;
    } else {
      $("#confirm-password-error").text("");
      return true;
    }
  }

  validatePhoneNumber = () => {
    var number = $("#number").val();

    if (number.length != 10) {
      $("#phoneError").text("*phone number must contain only 10 digits");
      return false;
    } else {
      $("#phoneError").text("");
      return true;
    }
  };

  validateBusiness = () => {
    console.log("business");
    var business = $("#business");
    console.log(business.val() == "");
    if (business.val() == "") {
      $("#business-error").text("Please Select an option");
      return false;
    }
    $("#business-error").text("");
    return true;
  };

  document
    .getElementById("number")
    .addEventListener("keypress", function (evt) {
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault();
      }
    });

  $("#next").css({ color: "grey" });
  $(".website").css({ "background-color": "#c6ffff" });
  $(".truenorth-page").css({
    "background-color": "white",
    "border-radius": "10px",
    height: "90%",
    margin: "auto",
    "padding-bottom": "20px",
  });
  $(".truenorth-title").css({
    "font-size": "25px",
    "margin-left": "100px",
    "margin-top": "10px",
    "font-weight": "bold",
  });
  $(".truenorth-card").css({
    "max-width": "500px",
    width: "100%",
    margin: "auto",
    "margin-top": "20px",
  });
  $(".hand-image").css({ height: "60px" });
  // $(".truenorth-card-title").css({"font-size":"32px"});
  $(".user-info").css({ color: "grey" });
  $(".label").css({
    display: "block",
    "font-weight": "600",
    "margin-bottom": "10px",
  });
  $(".input").css({
    "border-radius": "5px",
    padding: "5px",
    border: "1px solid grey",
    "margin-bottom": "10x",
    width: "100%",
    border: "none",
    "border-bottom": "1px solid blue ",
  });
  $(".input-field").css({ "margin-bottom": "30px", position: "relative" });
  $("#prev").css({ color: "#6d6ddf" });
  $(".button").css({
    width: "100%",
    border: "none",
    color: "grey",
    padding: "5px",
    "border-radius": "8px",
  });
  $(".random-jokes").css({
    "background-color": "white",
    "border-radius": "10px",
    "max-width": "600px",

    width: "100%",
  });

  $(".dot-icons").css({ "margin-top": "100px" });
  //   $(".dot-icons").css("");
  //   $("#prev").css({ color: "green" });
  $(".laughing-image").css({ height: "50px" });
  $("#nextButton").click(function () {
    const user = validateName();
    const email = validateEmailAddress();
    const company = validateCompanyname();
    const business = validateBusiness();

    if (user && email && company && business) {
      $("#prev").css({ color: "grey" });
      $("#next").css({ color: "#6d6ddf" });
      console.log(document.getElementById("website"));
      document
        .getElementById("questionsFirstCard")
        .classList.add("displayNone");
      $(".questions-next-card").removeClass("displayNone");
    }
    $("#submit").click(function () {
      const pass = validatePassword();
      const cpass = validateConfirmPassword();
      const number = validatePhoneNumber();

      if (pass && cpass && number) {
        var limit = 5;
        $.ajax({
          method: "GET",
          url: "https://api.api-ninjas.com/v1/jokes?limit=" + limit,
          headers: { "X-Api-Key": "J2qa4FapsdQUcBzyHhaGzA==CAslW9XKPo5uRIlM" },
          contentType: "application/json",
          success: function (result) {
            console.log(result);
            document
              .getElementById("trunorthWebsite")
              .classList.add("displayNone");
            $("#joke").removeClass("displayNone");

            for (i = 0; i < 5; i++) {
              const joke = `<li class="joke"><i class="fa-solid fa-face-laugh face-icon"></i>${result[i].joke}</li>`;
              $("#jokeList").append(joke);
            }
          },
          error: function ajaxError(jqXHR) {
            console.error("Error: ", jqXHR.responseText);
          },
        });
      }
    });

    $("#prev").click(function () {
      $("#next").css({ color: "grey" });
      $("#prev").css({ color: "#6d6ddf" });
      document
        .getElementById("questionsSecondCard")
        .classList.add("displayNone");
      $("#questionsFirstCard").removeClass("displayNone");
    });

    $("#next").click(function () {
      $("#prev").css({ color: "grey" });
      $("#next").css({ color: "#6d6ddf" });
      document
        .getElementById("questionsFirstCard")
        .classList.add("displayNone");
      $("#questionsSecondCard").removeClass("displayNone");
    });
  });
});
