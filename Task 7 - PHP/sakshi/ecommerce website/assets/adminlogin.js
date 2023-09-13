$(document).ready(function () {
    var userId = localStorage.getItem("token");
    if (userId) {
      window.location.replace("../admin area/index.html");
    }
  
    $("#submitBtn").click(function () {
      var email = $("#staticEmail").val();
      var password = $("#inputPassword").val();
  
      $.post("../api/adminlogin.php", {email:email,password:password},function(result){
          var result = JSON.parse(result);
          if (!result.status) {
            alert(result.message);
          } else {
            localStorage.setItem("token", result.data);
            window.location.replace("../admin area/index.html");
          }
        }
      );
    });
  });