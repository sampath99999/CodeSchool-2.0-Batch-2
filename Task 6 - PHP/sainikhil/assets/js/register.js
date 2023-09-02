$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (userId) {
    window.location.replace("dashboard.html");
  }
  $("#registerBtn").click(function (event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    if (password == "") {
      alert("Password Cannot Be Empty");
      return;
    }
    $.post(
      "./api/register.php",
      { email: email, password: password, confirmPassword: confirmPassword },
      function (result) {
        result = JSON.parse(result);
        if (!result.status) {
          alert(result.message);
        } else {
          window.location.replace("./login.html");

          $("#result").text(result.message);
        }
      }
    );
  });
  $("#loginBtn").click(function (event) {
    event.preventDefault();
    window.location.replace("./login.html");
  });
});
