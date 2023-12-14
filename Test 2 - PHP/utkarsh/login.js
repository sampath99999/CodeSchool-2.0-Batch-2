$(document).ready(function () {
  $("#submitBtn").click(function () {
    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();
    var role = $("#roleInput").val();

    $.post(
      "api/login.php",
      { email: email, password: password, role: role },
      function (result) {
        var result = JSON.parse(result);
        if (!result.status) {
          alert(result.message);
        } else {
       
          if (result.status === true) {
            if (role === "1") {
              window.location.href = "admin.html";
            } else if (role === "2") {
              window.location.href = "employee.html";
            } else if (role === "3") {
              window.location.href = "hr.html";
            }
          }
        }
      }
    );
  });
});



  