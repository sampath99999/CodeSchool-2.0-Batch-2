$(document).ready(function() {

    var userId = localStorage.getItem('token');
    if(userId){
        window.location.replace("login.html");
    }
        $("#submitBtn").click(function () {
        var name = $("#nameInput").val();
      var email = $("#emailInput").val();
      var password = $("#passwordInput").val();
      var confirmPassword = $("#confirmPasswordInput").val();
      $.post(
        "api/register.php",
        {name: name, email: email, password: password,confirmPassword: confirmPassword},
       
        function (result) {
            console.log(result);
          var result = JSON.parse(result);
          
          if (!result.status) {
            alert(result.message);
          } else {
            window.location.replace("login.html");
            $("#result").text(result.message);
          }
        }
      );
    });
    });
    