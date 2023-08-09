$(document).ready(() => {
  $("#logintonext").click(function () {
    $("#passwordError").empty();
    $("#emailError").empty();
    var email = $("#email").val();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var password = $("#password").val();
    var hasErrors = false;
    if (!emailPattern.test(email)) {
      $("#emailError").append("<p>Please enter an email.</p>");
      hasErrors = true;
    }
    if (password === "") {
      $("#passwordError").html("Password cannot be empty!").css("color", "red");
      hasErrors = true;
    }
    if (!hasErrors) {
      const url = `https://v2.jokeapi.dev/joke/Any?type=single&amount=10`;

      $.get(url, function (data, status) {
        let num = Math.floor(Math.random() * 10);
        console.log(email);
        $(".registrationForm").html(`<div class="text-align center fs-5 h-25">
        Hello <br> ${email},<br> Here's your Joke
        <br>
       ${data.jokes[num].joke} 
       </div>
     
      `);
      });
    }
  });

  $("#signuppage").click(function () {
    $.ajax({
      type: "get",
      url: "register.html",
      data: {},
      success: function (data) {
        $("#form").html(data);
      },
    });
  });
});
