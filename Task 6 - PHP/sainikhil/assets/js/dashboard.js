$(document).ready(function () {
  var token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login.html");
  }

  $.post("./api/adminWelcome.php", { token: token }, function (result) {
    result = JSON.parse(result);
    console.log(result.email);
    $("#welcomeMsg").append(
      `<span class="text-warning">  ${result.email}</span>`
    );
  });
  $("#logoutBtn").click(function () {
    var token = localStorage.getItem("token");
    $.post("./api/logout.php", { token: token }, function (result) {
      result = JSON.parse(result);
      if (result.status) {
        localStorage.removeItem("token");
        alert(result.message);
        window.location.replace("./login.html");
      }
    });
  });
});
