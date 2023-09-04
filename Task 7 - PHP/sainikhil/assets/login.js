$(document).ready(function () {
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
          window.location.replace("./dashboard.html");
        }
      }
    );
  });
});
