$(document).ready(function () {
    var userId = localStorage.getItem("token");
    if (userId) {
      window.location.replace("order.html");
    }
  
    $("#submitBtn").click(function () {
      var email = $("#emailInput").val();
      var password = $("#passwordInput").val();
      
      $.post(
        "api/login.php",
        { email: email, password: password },
        function (result) {
          var result = JSON.parse(result);
          if (!result.status) {
            alert(result.message);
          } else {
            localStorage.setItem("tokens", result.data);
            window.location.replace("order.html");
          }
        }
      );
    });
  });
  