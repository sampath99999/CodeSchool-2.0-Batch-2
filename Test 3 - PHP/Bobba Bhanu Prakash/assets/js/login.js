$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (userId) {
    window.location.replace("home.html");
  }

  $("#loginBtn").click(function () {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    var flag = 1;
    if (email.match(/@gmail.com|edu.in|@reqres.in/g)?.length != 1) {
      $("#loginEmailError").text("Enter valid mail");
      flag = 0;
    } else {
      $("#loginEmailError").css("display", "none");
    }
    if (password.length < 8) {
      $("#loginPasswordError").text("Invalid password");
      flag = 0;
    } else if (
      password.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&_*$!-])/).length != 1
    ) {
      $("#loginPasswordError").text("Invalid password");
      flag = 0;
    } else {
      $("#loginPasswordError").css("display", "none");
    }
    if (flag) {
      $.post(
        "api/login.php",
        { email: email, password: password },
        function (result) {
          try {
            result = JSON.parse(result);

            if (!result.status) {
              alert(result.message);
            } else {
              localStorage.setItem("token", result.data);
              window.location.replace("home.html");
            }
          } catch (error) {
            alert("Error parsing JSON:", error);
          }
        }
      ).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred:" + errorThrown);
      });
    }
  });
});
