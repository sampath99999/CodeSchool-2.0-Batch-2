let navBarOpen = true;
let validPartyAccountNumber = false;
let confirmationOfPartyAccountNumber = false;
let validPartyName = false;
let validIFSC_CODE = false;

const onlyNumbers = /^[0-9]+$/;
const alphaNumeric = /^[a-zA-Z0-9]+$/;
const upperCaseAlphbets = /^[A-Z]+$/;

// let url = "https://ifsc.razorpay.com/";

$(document).ready(function () {
  function updateCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    var formattedTime =
      hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;
    $(".currentTime").text(formattedTime);
  }

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
});

// Login and logout functionality
var logout = true;

var date;

function getDate() {
  var now = new Date();
  var day = now.getDate();
  var month = now.toLocaleString("default", { month: "short" });
  var year = now.getFullYear();

  var formattedDate = day + "-" + month + "-" + year;

  return formattedDate;

  //   $(".LoginDate").text(formattedDate);
}

$(".logout").click(function () {
  if (logout) {
    $(".logout-text").text("Login");
    date = getDate();
    $(".LoginDate").text(date);
    logout = false;
  } else {
    $(".logout-text").text("Logout");
    logout = true;
  }
});

$(".menuBtn").click(function () {
  if (window.matchMedia("(min-width: 600px)").matches) {
    if (navBarOpen) {
      $(".sidebar").css({ width: "19vw" });
      $(".mainBlock").css({ "margin-left": "19vw", width: "80vw" });
      $(".issueChequeContainer").css({ width: "75vw", "margin-right": "5px" });
      $(".points-to-remember").css({ width: "75vw", "margin-right": "5px" });
      navBarOpen = false;
    } else {
      $(".sidebar").css({ width: "0" });
      $(".mainBlock").css({ "margin-left": "0", width: "100vw" });
      $(".issueChequeContainer").css({ width: "90vw" });
      $(".points-to-remember").css({ width: "90vw" });
      navBarOpen = true;
    }
  } else {
    if (navBarOpen) {
      $(".sidebar").css({ width: "50vw" });
      $(".mainBlock").css({ "margin-left": "0" });

      navBarOpen = false;
    }
  }
});

$(".main").click(function () {
  if (window.matchMedia("(max-width: 600px)").matches) {
    $(".sidebar").css({ width: "0" });
    //   $(".mainBlock").css({ "margin-left": "0" });
    navBarOpen = true;
  }
});

function validateInput(event) {
  const input = event.target;
  const currentValue = input.value;

  console.log(currentValue);

  const newValue = currentValue.replace(/[^0-9]/g, "");
  input.value = newValue;
}

function validateTextInput(event) {
  const input = event.target;
  const currentValue = input.value;

  console.log(currentValue);

  const newValue = currentValue.replace(/[^A-Za-z0-9-']/, "");
  input.value = newValue;
}

function checkValidations() {
  // validation of party account number
  let partyAccountNumber = $("#inputPartyAccountNumber").val();
  console.log(partyAccountNumber);

  if (partyAccountNumber.length == 0) {
    $(".errorMessage").text("Please enter Party Account Number");
    validPartyAccountNumber = false;
  } else if (partyAccountNumber.length < 12 || partyAccountNumber.length > 22) {
    $(".errorMessage").text(
      "Party Account Number Must have Minimum 12 digits and Maximum 22 digits"
    );
    validPartyAccountNumber = false;
  } else if (!onlyNumbers.test(partyAccountNumber)) {
    $(".errorMessage").text("Party Account Number Contains Only Numbers");
    validPartyAccountNumber = false;
  } else {
    $(".errorMessage").text("");
    validPartyAccountNumber = true;
  }

  // validating confirmation of  party account number

  let confirmedPartyAccountNumber = $("#confirmPartyAccountNumber").val();
  if (confirmedPartyAccountNumber.length == 0) {
    $(".confirmAccountNumber-errorMessage").text(
      "Please Confirm Party Account Number"
    );
    confirmationOfPartyAccountNumber = false;
  } else if (confirmedPartyAccountNumber == partyAccountNumber) {
    $(".confirmAccountNumber-errorMessage").text("");
    confirmationOfPartyAccountNumber = true;
  } else {
    $(".confirmAccountNumber-errorMessage").text(
      "Party Account Number doesn't match! Please check"
    );
    confirmationOfPartyAccountNumber = false;
  }

  //  Validation of party name

  let partyName = $("#inputPartyName").val();
  if (partyName.length == 0) {
    $(".partyNameErrorMessage").text("Please enter Party Name");
    validPartyName = false;
  } else if (!alphaNumeric.test(partyName)) {
    $(".partyNameErrorMessage").text(
      "Party Name Should Not Contain Special Characters!"
    );
    validPartyName = false;
  } else {
    $(".partyNameErrorMessage").text("");
    validPartyName = true;
  }

  // Validation of IFSC code

  let IFSC_CODE = $("#inputIFSC").val();
  validIFSC(IFSC_CODE);
}

function validIFSC(IFSC_CODE) {
  let firstFourChar = IFSC_CODE.substring(0, 4);
  if (IFSC_CODE.length == 0) {
    $(".ifsc-errorMessage").text("Please enter IFSC CODE!");
    validIFSC_CODE = false;
  } else if (IFSC_CODE.length != 11) {
    $(".ifsc-errorMessage").text("IFSC CODE Must have 11 characters");
    validIFSC_CODE = false;
  } else if (!upperCaseAlphbets.test(firstFourChar)) {
    $(".ifsc-errorMessage").text(
      "first Four characters must be upper case alphabets!"
    );
    validIFSC_CODE = false;
  } else if (IFSC_CODE[4] != 0) {
    $(".ifsc-errorMessage").text("Fifth character must be 0!");
    validIFSC_CODE = false;
  } else if (!alphaNumeric.test(IFSC_CODE.substring(5, 11))) {
    $(".ifsc-errorMessage").text(
      "Last 6 characters must be Numeric or Alphabetic"
    );
    validIFSC_CODE = false;
  } else {
    $(".ifsc-errorMessage").text("");
    validIFSC_CODE = true;
  }
}

function getBankDetails() {
  let IFSC_CODE = $("#inputIFSC").val();

  let firstFourChar = IFSC_CODE.substring(0, 4);
  if (IFSC_CODE.length == 0) {
    $(".ifsc-errorMessage").text("Please enter IFSC CODE!");
    validIFSC_CODE = false;
  } else if (IFSC_CODE.length != 11) {
    $(".ifsc-errorMessage").text("IFSC CODE Must have 11 characters");
    validIFSC_CODE = false;
  } else if (!upperCaseAlphbets.test(firstFourChar)) {
    $(".ifsc-errorMessage").text(
      "first Four characters must be upper case alphabets!"
    );
    validIFSC_CODE = false;
  } else if (IFSC_CODE[4] != 0) {
    $(".ifsc-errorMessage").text("Fifth character must be 0!");
    validIFSC_CODE = false;
  } else if (!alphaNumeric.test(IFSC_CODE.substring(5, 11))) {
    $(".ifsc-errorMessage").text(
      "Last 6 characters must be Numeric or Alphabetic"
    );
    validIFSC_CODE = false;
  } else {
    $(".ifsc-errorMessage").text("");
    validIFSC_CODE = true;
  }

  if (validIFSC_CODE) {
    let url = "https://ifsc.razorpay.com/";
    let query = $("#inputIFSC").val();
    console.log("query is :", query);
    url = url + query;
    console.log("url is :", url);
    $.ajax({
      url: url,
      type: "GET",
      success: function (data) {
        console.log(data);
        setBankDetails(data);
      },
      error: function (data) {
        console.log(data);
        errorBankDetails(data);
        $(".ifsc-errorMessage").text("Not a Valid IFSC CODE");
        validIFSC_CODE = false;
      },
    });
  }
}

function setBankDetails(data) {
  let BANK = data.BANK;
  let BRANCH = data.BRANCH;
  $(".bankName").text(BANK);
  $(".bankBranch").text(BRANCH);
}

function validateTextInput(event) {
  const input = event.target;
  const currentValue = input.value;

  console.log(currentValue);

  const newValue = currentValue.replace(/[^0-9]/g, "");
  input.value = newValue;
}

$("#select").change(function () {
  let selectedValue = $(this).val();
  if (selectedValue == "0853001020002000000NVN") {
    $(".balance").text("1000000");
    $(".loc").text("5000");
  } else if (selectedValue == "8342001170004001000NVN") {
    $(".balance").text("1008340");
    $(".loc").text("4000");
  } else if (selectedValue == "2071011170004320000NVN") {
    $(".balance").text("14530000");
    $(".loc").text("78000");
  } else if (selectedValue == "8342001170004002000NVN") {
    $(".balance").text("1056400");
    $(".loc").text("34000");
  } else if (selectedValue == "2204000030006300303NVN") {
    $(".balance").text("123465400");
    $(".loc").text("5000");
  } else {
    $(".balance").text("XXXXXX");
    $(".loc").text("XXXXXX");
  }
});

function errorBankDetails(data) {
  let BANK = data.BANK;
  let BRANCH = data.BRANCH;
  $(".bankName").text("XXXXX");
  $(".bankBranch").text("XXXXX");
}

$("#inputAmount").keypress(function (event) {
  if (event.which === 13) {
    // validations of party amount
    var inputData = $(this).val();

    if (inputData.length == 0) {
      $(".party-AmountErrorMessage").text("Please enter Amount!");
      $(".party-amount-words").text("");
    } else {
      var number = parseInt(inputData);
      var words = numberToWords.toWords(number);
      $(".party-amount-words").text(words);
      $(".party-AmountErrorMessage").text("");
    }
  }
});

const add = document.getElementById("addFiles");
const fileInput = document.getElementById("inputChooseFile");
const fileList = document.getElementById("files");
const errorMsg = document.getElementById("fileErrorMsg");

add.addEventListener("click", function () {
  const currentFile = fileInput.files[0];
  console.log(currentFile);

  if (!currentFile) {
    errorMsg.textContent = "*Please select a file.";
    return;
  }

  let fileExists = false;
  const fileName = currentFile.name;
  console.log("file name is", fileName);
  const existingFile = Array.from(fileList.children).find((element) => {
    element.textContent === fileName;
  });
  console.log(existingFile);

  if (existingFile) {
    errorMsg.textContent = "*File already exists.";
  } else {
    const listItem = document.createElement("div");
    listItem.innerHTML = `<span>${fileName}</span>
      <span><i class="fa-solid fa-xmark remove-icon text-danger ms-2"></i></span>
      `;
    listItem.classList.add("filedesc");
    fileList.appendChild(listItem);
    errorMsg.textContent = "";

    const removeBtns = document.querySelectorAll(".remove-icon");
    removeBtns.forEach((icon) => {
      icon.addEventListener("click", function () {
        fileList.removeChild(listItem);
        errorMsg.textContent = "";
      });
    });
  }

  fileInput.value = "";
});
