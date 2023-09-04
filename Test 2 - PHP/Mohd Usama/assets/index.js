$(document).ready(function () {
  if (localStorage.getItem("token")){
    window.location.replace("/chat");
  }
  else{
    createLoginPage();
  }


  function createLoginPage() {
    const container = $("<div>").addClass("container mt-5");
    const row = $("<div>").addClass("row justify-content-center");
    const card = createLoginCard();
    const registerBtn = createRegisterBtn(registerPage);
    row.append(card);
    container.append(row, registerBtn);
    $("body").append(container);
  }

  function registerPage() {
    window.location.replace("/register");
  }
  function createRegisterBtn(registerClick) {
    const container = $("<div>").addClass("col-12 mt-3 text-center");
    const span = $("<span>", {
      class: "text-secondary px-4",
      text: "Don't have an Account?",
    });
    const button = $("<button>", {
      class: "btn btn-primary ",
      text: "Register",
    });
    if (registerClick) {
      button.click(registerClick);
    }
    container.append(span, button);
    return container;
  }

  function createInputField(type, placeholder, id) {
    return $("<input>", {
      class: "form-control mb-3",
      attr: {
        required: true,
        type: type,
        placeholder: placeholder,
      },
      id: id,
    });
  }

  function createButton(text, loginClick) {
    const button = $("<button>", {
      class: "btn btn-primary",
      text: text,
    });
    if (loginClick) {
      button.click(loginClick);
    }
    return button;
  }

  function validateUserInputs(username, password) {
    if (validateUserName(username) && validatePassword(password)) {
      return true;
    }
    return false;
  }

  function validateUserName(username) {
    if (username.length < 5 || username.length > 100) {
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)
    ) {
      return false;
    }
    return true;
  }

  function loginUser() {
    const username = $("#username").val().trim();
    const password = $("#pass").val().trim();
    if (!validateUserInputs(username, password)) {
      alert("Invalid Inputs");
    }
    $.post(
      "api/login.php",
      {
        username: username,
        password: password,
      },
      function (response) {
        const message = JSON.parse(response);
        if (message.status) {
          const token = message.token;
          localStorage.setItem("token", token);
          window.location.replace("/chat");
        } else {
          alert(message.message);
        }
      }
    );
  }

  function createLoginCard() {
    const card = $("<div>").addClass("col-md-6 card");
    const cardHeader = $("<div>")
      .addClass("card-header")
      .html("<h3>Login Chat User</h3>");
    const cardBody = $("<div>").addClass("card-body");
    const usernameInput = createInputField("text", "Username", "username");
    const passwordInput = createInputField("password", "Password", "pass");
    const submitButton = createButton("Login", loginUser);
    cardBody.append(usernameInput, passwordInput, submitButton);
    card.append(cardHeader, cardBody);
    return card;
  }
});
