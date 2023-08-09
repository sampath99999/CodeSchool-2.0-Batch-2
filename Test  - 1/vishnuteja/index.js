let email, creditCardNumber, expiryDate, cvv;
let emailErrorMessage, cardNumberErrorMessage;
cvvError;
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function handleSubmit(e) {
  e.preventDefault();

  //   Email validation
  email = document.getElementById("email");
  emailErrorMessage = document.getElementById("emailErrorMessage");
  console.log(email.value.length);
  if (email.value.length == 0) {
    emailErrorMessage.textContent = "Please enter email";
  } else if (email.value.length > 0 && !email.value.match(mailformat)) {
    emailErrorMessage.textContent = "The entered mail is not in right format";
  } else {
    emailErrorMessage.textContent = "";
  }

  //   card validation

  creditCardNumber = document.getElementById("creditCardNumber");
  cardNumberErrorMessage = document.getElementById("cardNumberError");

  if (creditCardNumber.value.length == 0) {
    cardNumberErrorMessage.textContent = "Please enter card Number";
  } else if (creditCardNumber.value.length !== 16) {
    cardNumberErrorMessage.textContent = "Card Number Contains 16 digits";
  } else {
    cardNumberErrorMessage.textContent = "";
  }

  //   Expiry date validation

  var dateFormat = /^\d{2}$/;

  expiryDate = document.getElementById("expiryDate");
  expiryDateError = document.getElementById("expiryDateError");
  console.log(expiryDate.value.length);

  if (expiryDate.value.length == 0) {
    expiryDateError.textContent = "Please enter expiry Date";
  } else {
    expiryDateError.textContent = "";
  }

  //   cvv validation

  cvv = document.getElementById("cvv");
  cvvError = document.getElementById("cvvError");
  console.log(cvv.value.length);
  if (cvv.value.length == 0) {
    cvvError.textContent = "Please enter cvv";
  } else if (cvv.value.length !== 3) {
    cvvError.textContent = "CVV Consists of 3 digits";
  } else {
    cvvError.textContent = "";
  }
}

let specificationOne, specificationTwo, specificationThree, specificationFour;
let planName, planAmount;
let subTotal, total;

function planOne() {
  planName = document.getElementById("planName");
  planName.textContent = "Basic Plan";

  planAmount = document.getElementById("planAmount");
  planAmount.textContent = "$50";

  specificationOne = document.getElementById("specificationOne");
  specificationOne.textContent = "Data Storage";

  specificationTwo = document.getElementById("specificationTwo");
  specificationTwo.textContent = "Data Processing";

  specificationThree = document.getElementById("specificationThree");
  specificationThree.textContent = "Network Usgae";

  specificationFour = document.getElementById("specificationFour");
  specificationFour.textContent = "5 TB storage";

  subTotal = document.getElementById("subTotal");
  subTotal.textContent = "$50";
  total = document.getElementById("totalAmount");
  total.textContent = "$54";
}

function planTwo() {
  // let specificationOne, specificationTwo, specificationThree, specificationFour;
  planName = document.getElementById("planName");
  planName.textContent = "Professional Plan";

  planAmount = document.getElementById("planAmount");
  planAmount.textContent = "$96";

  specificationOne = document.getElementById("specificationOne");
  specificationOne.textContent = "All feature in basic";

  specificationTwo = document.getElementById("specificationTwo");
  specificationTwo.textContent = "invoice management";

  specificationThree = document.getElementById("specificationThree");
  specificationThree.textContent = "Network Usgae and management";

  specificationFour = document.getElementById("specificationFour");
  specificationFour.textContent = "20 TB storage";

  subTotal = document.getElementById("subTotal");
  subTotal.textContent = "$96";
  total = document.getElementById("totalAmount");
  total.textContent = "$100";
}

function planThree() {
  planName = document.getElementById("planName");
  planName.textContent = "Professional Plan 2";

  planAmount = document.getElementById("planAmount");
  planAmount.textContent = "$120";

  specificationOne = document.getElementById("specificationOne");
  specificationOne.textContent = "All features in Professional plan";

  specificationTwo = document.getElementById("specificationTwo");
  specificationTwo.textContent = "FLexibility of Storage Expansion";

  specificationThree = document.getElementById("specificationThree");
  specificationThree.textContent = "storage Management";

  specificationFour = document.getElementById("specificationFour");
  specificationFour.textContent = "50 TB Storage";

  subTotal = document.getElementById("subTotal");
  subTotal.textContent = "$120";
  total = document.getElementById("totalAmount");
  total.textContent = "$";
}
