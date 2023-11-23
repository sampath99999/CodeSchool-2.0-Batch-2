$(document).ready(function () {
  $("#submitBtn").click(function () {
    var name = $("#nameInput").val();
    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();
    var confirmPassword = $("#confirmPasswordInput").val();
    var role = $("#roleInput").val();

    $.post(
      "api/register.php",
      {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      },

      function (result) {
        console.log(result);
        var result = JSON.parse(result);

        if (!result.status) {
          alert(result.message);
        } else {
            window.location.href = "login.html";
        }
      }
    );
  });
});
