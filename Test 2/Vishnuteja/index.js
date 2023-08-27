const email = document.getElementById("email");
const mobileNumber = document.getElementById("mobileNumber");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let emailError = document.getElementById("emailError");
let mobileNumberError = document.getElementById("mobileNumberError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");

let validEmail = false,
  validMobileNumber = false,
  validPassword = false,
  validConfirmPassword = false;

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function validateInput(event) {
  const input = event.target;
  const currentValue = input.value;

  console.log(currentValue);

  const newValue = currentValue.replace(/[^0-9]/g, "");
  input.value = newValue;
}

function handleSubmit(event) {
  event.preventDefault();

  // Email validation
  if (email.value.length == 0) {
    emailError.textContent = "Please enter email";
    validEmail = false;
  } else if (email.value.length > 0 && !email.value.match(mailformat)) {
    emailError.textContent = "The entered email is not in correct format";
    validEmail = false;
  } else {
    emailError.textContent = "";
    validEmail = true;
  }

  // Phone Number Validation

  if (mobileNumber.value.length == 0) {
    mobileNumberError.textContent = "Please enter Mobile Number";
    validMobileNumber = false;
  } else if (mobileNumber.value.length !== 10) {
    mobileNumberError.textContent = "Mobile Number Consists 10 digits";
    validMobileNumber = false;
  } else {
    mobileNumberError.textContent = "";
    validMobileNumber = true;
  }

  // Password Validation

  if (password.value.length == 0) {
    passwordError.textContent = "Please enter Password";
    validPassword = false;
  } else if (password.value.length < 5) {
    passwordError.textContent = "Please enter minimum 5 characters";
    validPassword = false;
  } else {
    passwordError.textContent = "";
    validPassword = true;
  }

  // Confirm Password

  if (confirmPassword.value == 0) {
    confirmPasswordError.textContent = "Please confirm password";
    validConfirmPassword = false;
  } else if (password.value != confirmPassword.value) {
    confirmPasswordError.textContent =
      "Password doesnt match! please check the password";
    validConfirmPassword = false;
  } else {
    confirmPasswordError.textContent = "";
    validConfirmPassword = true;
  }

  if (
    validEmail &&
    validMobileNumber &&
    validPassword &&
    validConfirmPassword
  ) {
    window.location.href = "index2.html";
  }
}
