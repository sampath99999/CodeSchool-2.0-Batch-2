document
  .getElementById("submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;

    var validUsername = "admin";
    var validPassword = "admin123";

    if (username === validUsername && password === validPassword) {
      window.location.href = "subscribers.html";
    }
  });
