$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (userId) {
    window.location.replace("dashboard.html");
  }
  function validateLoginFields() {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("#loginBtn");
    const email = emailInput.val().trim();
    const password = passwordInput.val().trim();

    if (email === "" || password === "") {
      loginBtn.prop("disabled", true);
    } else {
      loginBtn.prop("disabled", false);
    }
  }

  $("#email, #password").on("input", validateLoginFields);

  validateLoginFields();

  $("#loginBtn").click(function (e) {
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    $.post(
      "./api/login.php",
      {
        email: email,
        password: password,
      },
      function (result) {
        console.log(result);
        result = JSON.parse(result);
        if (result.status) {
          alert(result.message);
          localStorage.setItem("token", result.data);

          window.location.replace("./dashboard.html");
        } else {
          alert(result.message);
        }
      }
    ).fail(function (xhr, status, error) {
      alert("An error occurred: " + error);
    });
  });
});
