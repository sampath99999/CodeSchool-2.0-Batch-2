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
      $("#loginEmailErr").text("Enter valid mailId");
      flag = 0;
    } else {
      $("#loginEmailErr").css("display", "none");
    }
    if (password.length < 8) {
      $("#loginPasswordErr").text("Invalid password");
      flag = 0;
    } else if (password.match(/[a-z]+[0-9]+[@#$%^&_*$!-]+/g)?.length != 1) {
      $("#loginPasswordErr").text("invalid password");
      flag = 0;
    } else {
      $("#loginPasswordErr").css("display", "none");
    }
    if (flag) {
      $.post(
        "api/login.php",
        { email: email, password: password },
        function (result) {
          try {
            console.log(result);
            result = JSON.parse(result);

            if (!result.status) {
              alert(result.message);
            } else {
              localStorage.setItem("token", result.data);
              window.location.replace("home.html");
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      ).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("An error occurred:", errorThrown);
      });
    }
  });
});
