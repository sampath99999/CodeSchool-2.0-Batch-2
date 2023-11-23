$(document).ready(function () {
  var userId = localStorage.getItem("token");

  if (userId) {
    window.location.replace("./userdashboard.html");
  }

  $("#loginBtn").click(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    $.post(
      "./api/login.php",
      { email: email, password: password },
      function (result) {
        result = JSON.parse(result);

        if (!result.status) {
          alert(result.message);
        } else {
          localStorage.setItem("token", result.data);
          if (result.role == "admin")
            window.location.replace("./adminpanel.html");
          else {
            window.location.replace("./userdashboard.html");
          }
        }
      }
    );
  });
});
