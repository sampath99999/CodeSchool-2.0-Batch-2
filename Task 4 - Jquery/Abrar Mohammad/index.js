$(document).ready(function () {
  let dateFormat = new Date();
  let timeFormat = dateFormat.toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "2-digit",
  });
  $(".presentDate").text(
    `${dateFormat.getDate()}-${dateFormat.toLocaleString("en-us", {
      month: "long",
    })}-${dateFormat.getFullYear()}`
  );
  $(".presentDate").css({ fontSize: "12px" });
  $(".presentTime").text(`${timeFormat}`);
  $(".presentTime").css({ fontSize: "12px" });

  $(".largeHamBtn").click(function () {
    $("#rightSideContainer").toggleClass("rightContainer");
    $("#rightSideContainer").toggleClass("rightContainer2");
  });

  $(".logoutBtn").click(function () {
    if ($(".changeText").text() === "Logout") {
      $(".changeText").text("Login");
    } else if ($(".changeText").text() === "Login") {
      $(".changeText").text("Logout");
    }
  });

  // accountNumber
  $(".accountErrMsg").hide();
  $(".accountErrMsg").css({ fontSize: "12px" });
  let accountNumErr = true;
  $(".partyAccountNo").blur(function (event) {
    if (event.target.value === "") {
      $(".accountErrMsg").show();
      $(".accountErrMsg").text("*Please Enter Account Number");
      accountNumErr = true;
    } else if (event.target.value.match(/\D/g)) {
      $(".accountErrMsg").show();
      $(".accountErrMsg").text("*Please Enter Only Numbers");
      accountNumErr = true;
    } else if (event.target.value.length < 12) {
      $(".accountErrMsg").show();
      $(".accountErrMsg").text("*Please Enter Digits Between 12 and 22");
      accountNumErr = true;
    } else {
      $(".accountErrMsg").hide();
      accountNumErr = false;
    }
  });
  //confirmAccount
  $(".confirmAccountErr").hide();
  $(".confirmAccountErr").css({ fontSize: "12px" });
  let confirmaccountNumErr = true;
  $(".confirmAccountNo").blur(function (event) {
    if (event.target.value === "") {
      $(".confirmAccountErr").show();
      $(".confirmAccountErr").text("*Please Enter Value");
      confirmaccountNumErr = true;
    } else if ($(".partyAccountNo").val() !== $(this).val()) {
      $(".confirmAccountErr").show();
      $(".confirmAccountErr").text("*Account Number Should Be Same");
      confirmaccountNumErr = true;
    } else {
      $(".confirmAccountErr").hide();
      confirmaccountNumErr = false;
    }
  });
  //partyName
  $(".partyNameErr").hide();
  $(".partyNameErr").css({ fontSize: "12px" });
  let partyNameErrMsg = true;
  $(".partyName").blur(function (event) {
    if (event.target.value === "") {
      $(".partyNameErr").show();
      $(".partyNameErr").text("*Please Enter Party Name");
      partyNameErrMsg = true;
    } else if (
      event.target.value.match(/\W/) ||
      event.target.value.match(/[_]/)
    ) {
      $(".partyNameErr").show();
      $(".partyNameErr").text("*Name field doesn't contain special characters");
      partyNameErrMsg = true;
    } else {
      $(".partyNameErr").hide();
      partyNameErrMsg = false;
    }
  });
  //IFSC Code
  $(".ifscErr").hide();
  $(".ifscErr").css({ fontSize: "12px" });
  let ifscErrMsg = false;
  $(".ifscCode").blur(function (event) {
    if (event.target.value === "") {
      $(".ifscErr").show();
      $(".ifscErr").text("*Please Enter IFSC Code");
      ifscErrMsg = true;
    } else if (
      $(this).val().slice(0, 4) !== $(this).val().slice(0, 4).toUpperCase() ||
      $(this).val().length < 4
    ) {
      $(".ifscErr").show();
      $(".ifscErr").text("*First 4 characters should be Uppercase");
      ifscErrMsg = true;
    } else if ($(this).val().slice(4, 5) !== "0") {
      $(".ifscErr").show();
      $(".ifscErr").text("*Fifth character must be 0");
      ifscErrMsg = true;
    } else if (
      $(this).val().slice(5).match(/\W/) ||
      $(this).val().slice(5).match(/[_]/)
    ) {
      $(".ifscErr").show();
      $(".ifscErr").text("*Last 6 character must be Digits or Alphabets");
      ifscErrMsg = true;
    } else if ($(this).val().length !== 11) {
      $("ifscErr").show();
      $(".ifscErr").text("IFSC Code must be 11 characters");
      ifscErrMsg = true;
    } else if (
      $(".bankName").text() === "XXXX" ||
      $(".bankBranch").text() === "XXXX"
    ) {
      $(".ifscErr").show();
      $(".ifscErr").text("Please Search For IFSC Code");
    } else {
      $(".ifscErr").hide();
      ifscErrMsg = false;
    }
  });
  //bank search

  $("#bankSearchBtn").click(function () {
    let bankIfsc = $(".ifscCode").val();
    $.get(`https://ifsc.razorpay.com/${bankIfsc}`)
      .then(function (data, status) {
        let { BANK, BRANCH } = data;
        $(".bankName").text(BANK);
        $(".bankBranch").text(BRANCH);
      })
      .catch((error, statusText) => {
        $(".bankName").text("XXXX");
        $(".bankBranch").text("XXXX");
        $(".ifscErr").show();
        $("ifscErr").text(statusText);
      });
  });
  //Head of accounts
  let headOfAccount = [
    {
      HeadofAccount: "0853001020002000000NVN",
      Balance: "1000000",
      LOC: "5000",
    },
    {
      HeadofAccount: "8342001170004001000NVN",
      Balance: "1008340",
      LOC: "4000",
    },
    {
      HeadofAccount: "2071011170004320000NVN",
      Balance: "14530000",
      LOC: "78000",
    },
    {
      HeadofAccount: "8342001170004002000NVN",
      Balance: "1056400",
      LOC: "34000",
    },
    {
      HeadofAccount: "2204000030006300303NVN",
      Balance: "123465400",
      LOC: "5000",
    },
  ];

  $(".headOfAccount").change(function (event) {
    for (let each of headOfAccount) {
      let { HeadofAccount, Balance, LOC } = each;
      if ($(this).val() === each["HeadofAccount"]) {
        $(".headBalance").text(Balance);
        $(".headLoc").text(LOC);
        break;
      } else {
        $(".headBalance").text("XXXX");
        $(".headLoc").text("XXXX");
      }
    }
  });

  $(".headErr").hide();
  $(".headErr").css({ fontSize: "12px" });
  let headErrMsg = true;
  $(".headOfAccount").blur(function (event) {
    if (event.target.value === "Select") {
      $(".headErr").show();
      $(".headErr").text("Please Select an option");
      headErrMsg = true;
    } else {
      $(".headErr").hide();
      headErrMsg = false;
    }
  });

  //Expenditure Type

  let expenditureList = {
    "Capital Expenditure": [
      "Maintain current levels of operation within the organization",
      "Expenses to permit future expansion.",
    ],
    "Revenue Expenditure": [
      "Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services.",
      "All expenses incurred by the firm to guarantee the smooth operation.",
    ],
    "Deferred Revenue Expenditure": [
      "Exorbitant Advertising Expenditures",
      "Unprecedented Losses",
      " Development and Research Cost",
    ],
  };

  $(".expenditureType").change(function (event) {
    $(".purposeType").empty();
    $(".purposeType").append(`<option selected> Select </option> `);
    for (let each in expenditureList) {
      if ($(this).val() === each) {
        for (let i of expenditureList[each]) {
          $(".purposeType").append(`<option value = ${i}> ${i} </option>`);
        }
      }
    }
  });
  $(".expenditureError").hide();
  $(".expenditureError").css({ fontSize: "12px" });
  let expenditureErrMsg = true;
  $(".expenditureType").blur(function (event) {
    if (event.target.value === "Select") {
      $(".expenditureError").show();
      $(".expenditureError").text("Please Select an Option");
      expenditureErrMsg = true;
    } else {
      $(".expenditureError").hide();
      expenditureErrMsg = false;
    }
  });

  $(".purposeTypeErr").hide();
  $(".purposeTypeErr").css({ fontSize: "12px" });
  let purposeTypeErrMsg = true;
  $(".purposeType").blur(function (event) {
    if (event.target.value === "Select") {
      $(".purposeTypeErr").show();
      $(".purposeTypeErr").text("Please Select an option");
      purposeTypeErrMsg = true;
    } else {
      $(".purposeTypeErr").hide();
      purposeTypeErrMsg = false;
    }
  });

  $(".purposeErr").hide();
  $(".purposeErr").css({ fontSize: "12px" });
  let purposeErrMsg = true;
  $(".purpose").blur(function (event) {
    if (event.target.value === "") {
      $(".purposeErr").show();
      $(".purposeErr").text("Please Enter Valid Purpose");
      purposeErrMsg = true;
    } else {
      $(".purposeErr").hide();
      purposeErrMsg = false;
    }
  });

  $(".partyAmountErr").hide();
  $(".partyAmountErr").css({ fontSize: "12px" });
  let partyAmountErrMsg = true;

  $(".partyAmount").blur(function (event) {
    if (event.target.value === "") {
      $(".partyAmountErr").show();
      $(".partyAmountErr").text("Please Enter Amount");
      partyAmountErrMsg = true;
    } else if (
      event.target.value.match(/[D]/) ||
      event.target.value.includes("e") ||
      event.target.value.includes(".")
    ) {
      $(".partyAmountErr").show();
      $(".partyAmountErr").text("*Please Enter Numbers only");
      $(".amountInRs").text("");
      partyAmountErrMsg = true;
    } else {
      $(".partyAmountErr").hide();
      partyAmountErrMsg = false;
      var words = [
        "",
        "one ",
        "two ",
        "three ",
        "four ",
        "five ",
        "six ",
        "seven ",
        "eight ",
        "nine ",
        "ten ",
        "eleven ",
        "twelve ",
        "thirteen ",
        "fourteen ",
        "fifteen ",
        "sixteen ",
        "seventeen ",
        "eighteen ",
        "nineteen ",
      ];
      var words2 = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ];

      function inWords(partyAmount) {
        if ((partyAmount = partyAmount.toString()).length > 11)
          return "overflow";
        numValue = ("00000000000" + partyAmount)
          .substr(-11)
          .match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!numValue) return;
        var str = "";
        str +=
          numValue[1] != 0
            ? (words[Number(numValue[1])] ||
                words2[numValue[1][0]] + " " + words[numValue[1][1]]) + "arab "
            : "";
        str +=
          numValue[2] != 0
            ? (words[Number(numValue[2])] ||
                words2[numValue[2][0]] + " " + words[numValue[2][1]]) + "crore "
            : "";
        str +=
          numValue[3] != 0
            ? (words[Number(numValue[3])] ||
                words2[numValue[3][0]] + " " + words[numValue[3][1]]) + "lakh "
            : "";
        str +=
          numValue[4] != 0
            ? (words[Number(numValue[4])] ||
                words2[numValue[4][0]] + " " + words[numValue[4][1]]) +
              "thousand "
            : "";
        str +=
          numValue[5] != 0
            ? (words[Number(numValue[5])] ||
                words2[numValue[5][0]] + " " + words[numValue[5][1]]) +
              "hundred "
            : "";
        str +=
          numValue[6] != 0
            ? (str != "" ? "and " : "") +
              (words[Number(numValue[6])] ||
                words2[numValue[6][0]] + " " + words[numValue[6][1]]) +
              "only "
            : "";
        return str;
      }

      $(".amountInRs").text(inWords($(".partyAmount").val()));
    }
  });

  $(".fileErr").hide();
  $(".fileErr").css({ fontSize: "12px" });
  let fileErrMsg = true;
  $(".fileDocument").blur(function (event) {
    if (event.target.value === "") {
      $(".fileErr").show();
      $(".fileErr").text("*Please Upload a File");
      fileErrMsg = true;
    } else {
      $(".fileErr").hide();
      fileErrMsg = false;
    }
  });

  //Add Document

  let docs = [];

  $(".fileErr").hide();
  $("#addDocBtn").click(function () {
    $(".documentsCont").empty();
    if ($(".fileDocument").val() === "") {
      $(".fileErr").show().text("Please Choose a File");
    } else if (!docs.includes($(".fileDocument").val())) {
      docs = [...docs, $(".fileDocument").val()];
      $(".fileErr").hide();
    }

    for (let i of docs) {
      $(".documentsCont")
        .append(`<li class="d-flex justify-content-between"><p>${i}</p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg removeItemBtn" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg></li>`);

      $(".removeItemBtn").click(function () {
        docs = docs.filter(
          (eachItem) => eachItem !== $(this).siblings().text()
        );
        $(this).parent().remove();
      });
    }
  });

  function validateAccountNo() {
    let accountNo = $(".partyAccountNo").val();
    if (accountNo === "") {
      $(".accountErrMsg").show();
      $(".accountErrMsg").text("*Please Enter Account No");
      accountNumErr = true;
    } else if (accountNo.match(/\D/g)) {
      $(".accountErrMsg").show();
      $(".accountErrMsg").text("*Please Enter Valid Number");
      accountNumErr = true;
    } else if (accountNo.length < 12) {
      $(".accountErrMsg").show();
      $(".accountErrMsg").text("*Please Enter Digits Between 12 and 22");
      accountNumErr = true;
    } else {
      $(".accountErrMsg").hide();
      accountNumErr = false;
    }
  }

  function validateConfirmAccountNo() {
    let confirmAccountNumber = $(".confirmAccountNo").val();
    if (confirmAccountNumber === "") {
      $(".confirmAccountErr").show();
      $(".confirmAccountErr").text("*Please Enter Value");
      confirmaccountNumErr = true;
    } else if ($(".partyAccountNo").val() !== confirmAccountNumber) {
      $(".confirmAccountErr").show();
      $(".confirmAccountErr").text("*Account Number Should Be Same");
      confirmaccountNumErr = true;
    } else {
      $(".confirmAccountErr").hide();
      confirmaccountNumErr = false;
    }
  }

  function validatePartyName() {
    let partyNameIp = $(".partyName").val();
    if (partyNameIp === "") {
      $(".partyNameErr").show();
      $(".partyNameErr").text("*Please Enter Party Name");
      partyNameErrMsg = true;
    } else if (partyNameIp.match(/\W/) || partyNameIp.match(/[_]/)) {
      $(".partyNameErr").show();
      $(".partyNameErr").text("*Name field doesn't contain special characters");
      partyNameErrMsg = true;
    } else {
      $(".partyNameErr").hide();
      partyNameErrMsg = false;
    }
  }

  function validateIfscCode() {
    let ifscCodeIp = $(".ifscCode").val();
    if (ifscCodeIp === "") {
      $(".ifscErr").show();
      $(".ifscErr").text("*Please Enter IFSC Code");
      ifscErrMsg = true;
    } else if (
      ifscCodeIp.slice(0, 4) !== ifscCodeIp.slice(0, 4).toUpperCase() ||
      ifscCodeIp.length < 4
    ) {
      $(".ifscErr").show();
      $(".ifscErr").text("*First 4 characters should be Uppercase");
      ifscErrMsg = true;
    } else if (ifscCodeIp.slice(4, 5) !== "0") {
      $(".ifscErr").show();
      $(".ifscErr").text("*Fifth character must be 0");
      ifscErrMsg = true;
    } else if (
      ifscCodeIp.slice(5).match(/\W/) ||
      ifscCodeIp.slice(5).match(/[_]/)
    ) {
      $(".ifscErr").show();
      $(".ifscErr").text("*Last 6 character must be Digits or Alphabets");
      ifscErrMsg = true;
    } else if (ifscCodeIp.length !== 11) {
      $("ifscErr").show();
      $(".ifscErr").text("IFSC Code must be 11 characters");
      ifscErrMsg = true;
    } else if (
      $(".bankName").text() === "XXXX" ||
      $(".bankBranch").text() === "XXXX"
    ) {
      $(".ifscErr").show();
      $(".ifscErr").text("Please Search For IFSC Code");
    } else {
      $(".ifscErr").hide();
      ifscErrMsg = false;
    }
  }

  function validateHeadofAccount() {
    let headofAccountIp = $(".headOfAccount").val();
    if (headofAccountIp === "Select") {
      $(".headErr").show();
      $(".headErr").text("Please Select an option");
      headErrMsg = true;
    } else {
      $(".headErr").hide();
      headErrMsg = false;
    }
  }

  function validateExpenditureType() {
    let expenditureTypeIp = $(".expenditureType").val();
    if (expenditureTypeIp === "Select") {
      $(".expenditureError").show();
      $(".expenditureError").text("Please Select an Option");
      expenditureErrMsg = true;
    } else {
      $(".expenditureError").hide();
      expenditureErrMsg = false;
    }
  }

  function validatePurposeType() {
    let purposeTypeIp = $(".purposeType").val();
    if (purposeTypeIp === "Select") {
      $(".purposeTypeErr").show();
      $(".purposeTypeErr").text("Please Select an option");
      purposeTypeErrMsg = true;
    } else {
      $(".purposeTypeErr").hide();
      purposeTypeErrMsg = false;
    }
  }

  function validatePurpose() {
    let purposeIp = $(".purpose").val();
    if (purposeIp === "") {
      $(".purposeErr").show();
      $(".purposeErr").text("Please Enter Valid Purpose");
      purposeErrMsg = true;
    } else {
      $(".purposeErr").hide();
      purposeErrMsg = false;
    }
  }

  function validateDocument() {
    let fileDoc = $(".fileDocument").val();
    if (fileDoc === "") {
      $(".fileErr").show();
      $(".fileErr").text("*Please Upload a File");
      fileErrMsg = true;
    } else {
      $(".fileErr").hide();
      fileErrMsg = false;
    }
  }

  function validatePartyAmount() {
    let partyAmountIp = $(".partyAmount").val();
    if (partyAmountIp === "") {
      $(".partyAmountErr").show();
      $(".partyAmountErr").text("Please Enter Amount");
      partyAmountErrMsg = true;
    } else if (
      partyAmountIp.match(/[D]/) ||
      partyAmountIp.includes(".") ||
      partyAmountIp.includes(".")
    ) {
      $(".partyAmountErr").show();
      $(".partyAmountErr").text("*Please Enter Numbers only");
      partyAmountErrMsg = true;
    } else {
      $(".partyAmountErr").hide();
      partyAmountErrMsg = false;
    }
  }

  $("#nextValidBtn").click(function (event) {
    event.preventDefault();
    validateAccountNo();
    validateConfirmAccountNo();
    validatePartyName();
    validateIfscCode();
    validateHeadofAccount();
    validateExpenditureType();
    validatePurposeType();
    validatePurpose();
    validatePartyAmount();
    validateDocument();
    if (
      accountNumErr === true ||
      confirmaccountNumErr === true ||
      partyNameErrMsg === true ||
      ifscErrMsg === true ||
      headErrMsg === true ||
      expenditureErrMsg === true ||
      purposeTypeErrMsg === true ||
      purposeErrMsg === true ||
      partyNameErrMsg === true ||
      partyAmountErrMsg === true ||
      fileErrMsg === true
    ) {
      return true;
    } else {
      alert("Success");
      $(".partyAccountNo").val("");
      $(".confirmAccountNo").val("");
      $(".partyName").val("");
      $(".ifscCode").val("");
      $(".purpose").val("");
      $(".headOfAccount").val("Select");
      $(".expenditureType").val("Select");
      $(".purposeType").val("Select");
      $(".partyAmount").val("");
      $(".amountInRs").text("Amount in words");
      $(".bankName").text("XXXX");
      $(".bankBranch").text("XXXX");
      $(".headBalance").text("XXXX");
      $(".headLoc").text("XXXX");
    }
  });
});
