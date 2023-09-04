$(document).ready(function () {
  if (localStorage.getItem("token")) {
    window.location.replace("/chat");
  } else {
    createRegisterPage();
  }

  function createRegisterPage() {
    const container = $("<div>").addClass("container mt-5");
    const row = $("<div>").addClass("row justify-content-center");
    const card = createRegistrationCard();
    const loginBtn = createLoginBtn(loginPage);
    row.append(card);
    container.append(row, loginBtn);
    $("body").append(container);
  }

  function loginPage() {
    window.location.replace("/");
  }
  function createLoginBtn(loginClick) {
    const container = $("<div>").addClass("col-12 mt-3 text-center");
    const span = $("<span>", {
      class: "text-secondary px-4",
      text: "Already have an account?",
    });
    const button = $("<button>", {
      class: "btn btn-primary ",
      text: "Login",
    });
    if (loginClick) {
      button.click(loginClick);
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

  function createButton(text, registerClick) {
    const button = $("<button>", {
      class: "btn btn-primary",
      text: text,
    });
    if (registerClick) {
      button.click(registerClick);
    }
    return button;
  }

  function validateUserInputs(name, username, email, password) {
    if (
      validateName(name) &&
      validateUserName(username) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      return true;
    }
    return false;
  }

  function validateName(name) {
    if (name.length < 3 || name.length > 255) {
      alert("name");
      return false;
    }
    return true;
  }

  function validateUserName(username) {
    if (
      username.length < 5 ||
      username.length > 100 ||
      /^[a-zA-Z0-9]+$/.test(username)
    ) {
      alert("user");
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    if (
      email.length < 5 ||
      email.length > 255 ||
      /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(email)
    ) {
      alert("email");
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)
    ) {
      alert("pass");
      return false;
    }
    return true;
  }

  function registerUser() {
    const name = $("#name").val().trim();
    const username = $("#username").val().trim();
    const email = $("#email").val().trim();
    const password = $("#pass").val().trim();
    if (!validateUserInputs(name, username, email, password)) {
      return;
    }
    $.post(
      "api/register.php",
      {
        name: name,
        username: username,
        email: email,
        password: password,
      },
      function (response) {
        message = JSON.parse(response);
        if (message.status) {
          window.location.replace("/");
        } else {
          alert("Registration failed: " + message.message);
        }
      }
    );
  }

  function createRegistrationCard() {
    const card = $("<div>").addClass("col-md-6 card");
    const cardHeader = $("<div>")
      .addClass("card-header")
      .html("<h3>Register Chat User</h3>");
    const cardBody = $("<div>").addClass("card-body");
    const nameInput = createInputField("text", "Name", "name");
    const usernameInput = createInputField("text", "Username", "username");
    const emailInput = createInputField("email", "Email", "email");
    const passwordInput = createInputField("password", "Password", "pass");
    const submitButton = createButton("Register", registerUser);
    cardBody.append(
      nameInput,
      usernameInput,
      emailInput,
      passwordInput,
      submitButton
    );
    card.append(cardHeader, cardBody);
    return card;
  }
});
