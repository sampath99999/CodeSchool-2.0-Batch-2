$(document).ready(function () {
  // navHeaderContainer

  let lastLoginDate = new Date();

  $(".lastLoginDate").text(
    `${lastLoginDate.getDate()}-${lastLoginDate.toLocaleString("en-us", {
      month: "short",
    })}-${lastLoginDate.getFullYear()}`
  );

  let dateFormat = lastLoginDate.toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "2-digit",
  });
  $(".lastLoginTime").text(dateFormat);

  $(".menuBtn").click(function () {
    $("#ifmisHomeRightContainer").toggleClass("ifmisHomeRightContainer");
    $("#ifmisHomeRightContainer").toggleClass("ifmisHomeRightContainerClick");
  });

  // partyAccount

  let partyAccountBoolean = false;
  $(".partyErrMsg").hide();
  $(".partyAccountnoEL").blur(function () {
    let text = $(this).val();
    if (text === "") {
      $(".partyErrMsg").show().text("Please enter account no");
      partyAccountBoolean = false;
    } else if (text.match(/\D/g)) {
      $(".partyErrMsg").show().text("Please enter valid account no");
      partyAccountBoolean = false;
    } else if (text.length < 12) {
      $(".partyErrMsg").show().text("Account no should contain 12 digits");
      partyAccountBoolean = false;
    } else {
      partyAccountBoolean = true;
      $(".partyErrMsg").hide();
    }
  });

  // confirmPartyAccount

  let ConfirmPartyAccountBoolean = false;

  $(".confirmPartyAccountErrMsg").hide();

  $(".confirmPartyAccountCardEl").blur(function () {
    let text = $(this).val();

    if (text === "") {
      $(".confirmPartyAccountErrMsg").show().text("Please enter account no");
      ConfirmPartyAccountBoolean = false;
    } else if (text !== $(".partyAccountnoEL").val()) {
      $(".confirmPartyAccountErrMsg").show().text("Account no should be same");
      ConfirmPartyAccountBoolean = false;
    } else {
      ConfirmPartyAccountBoolean = true;
      $(".confirmPartyAccountErrMsg").hide();
    }
  });

  // partyName

  let partyNameBoolean = false;

  $(".partyNameErrMsg").hide();

  $(".partyNameEl").blur(function () {
    let text = $(this).val();

    if (text === "") {
      $(".partyNameErrMsg").show().text("Please enter party name");
      partyNameBoolean = false;
    } else if (text.match(/\W/) || text.match(/[_]/g)) {
      $(".partyNameErrMsg")
        .show()
        .text("Name doesn't contain special characters");
      partyNameBoolean = false;
    } else {
      partyNameBoolean = true;
      $(".partyNameErrMsg").hide();
    }
  });

  // bankIfsc

  let bankIfscBoolean = false;

  $(".bankIfscCardErrMsg").hide();

  $(".bankIfscCardEl").blur(function () {
    let text = $(this).val();
    if (text === "") {
      $(".bankIfscCardErrMsg").show().text("Please enter ifsc Code");
      bankIfscBoolean = false;
    } else if (
      text.slice(0, 4) !== text.slice(0, 4).toUpperCase() ||
      text.length < 4
    ) {
      $(".bankIfscCardErrMsg")
        .show()
        .text("First 4 letters should be capitals");
      bankIfscBoolean = false;
    } else if (text.slice(4, 5) !== "0") {
      $(".bankIfscCardErrMsg").show().text("Fifth letter should be 0");
      bankIfscBoolean = false;
    } else if (text.slice(5).match(/\W/) || text.slice(5).match(/[_]/)) {
      $(".bankIfscCardErrMsg")
        .show()
        .text("Last 6 letters should not be special characters");
      bankIfscBoolean = false;
    } else if (text.length !== 11) {
      $(".bankIfscCardErrMsg")
        .show()
        .text("Ifsc code must contain 11 characters");
      bankIfscBoolean = false;
    } else {
      if ($(".bankName").text() === "xxxx") {
        $(".bankIfscCardErrMsg").show().text("Please search ifsc code");
      } else {
        bankIfscBoolean = true;
        $(".bankIfscCardErrMsg").hide();
      }
    }
  });

  // BrankDetails

  $(".searchBtn").click(function () {
    let ifscCode = $(".bankIfscCardEl").val();
    if (ifscCode === "") {
      $(".bankIfscCardErrMsg").show().text("Please enter ifsc Code");
    } else if ($(".bankIfscCardEl").val().length === 11) {
      $.get(`https://ifsc.razorpay.com/${ifscCode}`)
        .then(function (data) {
          let { BANK, BRANCH } = data;
          $(".bankName").text(BANK);
          $(".branchName").text(BRANCH);
          $(".bankIfscCardErrMsg").hide();
        })
        .catch(function (error) {
          bankIfscBoolean = false;
          $(".bankIfscCardErrMsg").show().text(error.responseJSON);
          $(".bankName").text("xxxx");
          $(".branchName").text("xxxx");
        });
    }
  });

  // headOfAccount

  let headOfAccountBoolean = false;

  let headOfAccountList = {
    0: { balance: 1000000, loc: 5000 },
    1: { balance: 1008340, loc: 4000 },
    2: { balance: 14530000, loc: 78000 },
    3: { balance: 1056400, loc: 34000 },
    4: { balance: 123465400, loc: 5000 },
  };

  $(".headOfAccountEL").change(function () {
    for (let i in headOfAccountList) {
      if (i === $(this).val()) {
        $(".headBalance").text(headOfAccountList[i]["balance"]);
        $(".headLoc").text(headOfAccountList[i]["loc"]);
        break;
      } else {
        $(".headBalance").text("xxxx");
        $(".headLoc").text("xxxx");
      }
    }
  });

  $(".headOfAccountEL").blur(function () {
    if ($(this).val() === "") {
      $(".headOfAccountErrMsg").text("Please selcet an option");
      headOfAccountBoolean = false;
    } else {
      $(".headOfAccountErrMsg").hide();
      headOfAccountBoolean = true;
    }
  });

  // expenditureType

  let expenditureTypeBoolean = false;

  let expenditureTypeList = {
    0: [
      "Maintain current levels of operation within the organization",
      "Expenses to permit future expansion.",
    ],
    1: [
      "Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services.",
      "All expenses incurred by the firm to guarantee the smooth operation.",
    ],
    2: [
      "Exorbitant Advertising Expenditures",
      "Unprecedented Losses",
      "Development and Research Cost",
    ],
  };

  $(".expenditureTypeEl").change(function () {
    $(".purposeTypeEl").empty();
    $(".purposeTypeEl").append(`<option value="">Select</option>`);
    for (let i in expenditureTypeList) {
      if (i === $(this).val()) {
        for (let j of expenditureTypeList[i]) {
          $(".purposeTypeEl").append(`<option value=${j}>${j}</option>`);
        }
        break;
      }
    }
  });

  $(".expenditureTypeEl").blur(function () {
    if ($(this).val() === "") {
      $(".expenditureTypeErrMsg").text("Please selcet an option");
      expenditureTypeBoolean = false;
    } else {
      $(".expenditureTypeErrMsg").hide();
      expenditureTypeBoolean = true;
    }
  });

  // purposeType

  let purposeTypeBoolean = false;
  $(".purposeTypeErrMsg").hide();
  $(".purposeTypeEl").blur(function () {
    if ($(this).val() === "") {
      $(".purposeTypeErrMsg").show().text("Please selcet an option");
      purposeTypeBoolean = false;
    } else {
      $(".purposeTypeErrMsg").hide();
      purposeTypeBoolean = true;
    }
  });

  // purpose
  let purposeBoolean = false;
  $(".purposeEl").blur(function () {
    if ($(this).val() === "") {
      $(".purposeErrMsg").text("Please enter purpose");
      purposeBoolean = false;
    } else {
      $(".purposeErrMsg").hide();
      purposeBoolean = true;
    }
  });

  // partyAmountEl

  let below20List = [
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
  let above20List = [
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

  function convertAmountToWords(amount) {
    if ((amount = amount.toString()).length > 14) {
      return "Amount out of range...";
    }
    var n = ("00000000000000" + amount)
      .substr(-14)
      .match(/^(\d{2})(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    console.log(n)
    var amountInWord = "";
    amountInWord +=
      n[1] != 0
        ? (below20List[Number(n[1])] ||
            above20List[n[1][0]] + " " + below20List[n[1][1]]) + "lakh "
        : "";
    amountInWord +=
      n[2] != 0
        ? (below20List[Number(n[2])] ||
            above20List[n[2][0]] + " " + below20List[n[2][1]]) + "thousand "
        : "";
    amountInWord +=
      n[3] != 0
        ? (below20List[Number(n[3])] ||
            above20List[n[3][0]] + " " + below20List[n[3][1]]) + "hundred "
        : "";
    amountInWord +=
      n[4] != 0
        ? (below20List[Number(n[4])] ||
            above20List[n[4][0]] + " " + below20List[n[4][1]]) + "crore "
        : "";
    amountInWord +=
      n[5] != 0
        ? (below20List[Number(n[5])] ||
            above20List[n[5][0]] + " " + below20List[n[5][1]]) + "lakh "
        : "";
    amountInWord +=
      n[6] != 0
        ? (below20List[Number(n[6])] ||
            above20List[n[6][0]] + " " + below20List[n[6][1]]) + "thousand "
        : "";
    amountInWord +=
      n[7] != 0
        ? (below20List[Number(n[7])] ||
            above20List[n[7][0]] + " " + below20List[n[7][1]]) + "hundred "
        : "";
    amountInWord +=
      n[8] != 0
        ? (amountInWord != "" ? "and " : "") +
          (below20List[Number(n[8])] ||
            above20List[n[8][0]] + " " + below20List[n[8][1]]) +
          "only "
        : "";
    return amountInWord;
  }

  let partyAmountBoolean = false;

  $(".partyAmountErrMsg").hide();

  $(".partyAmountEl").blur(function (event) {
    if (event.target.value === "") {
      $(".partyAmountErrMsg").show().text("Please enter party amount");
      $(".partyAmountWordsEl").text("Amount in words...");
      partyAmountBoolean = false;
    } else if ($(this).val().match(/\D/)) {
      $(".partyAmountErrMsg").show().text("Amount should be in number");
      $(".partyAmountWordsEl").text("Amount in words...");
      partyAmountBoolean = false;
    } else {
      partyAmountBoolean = true;
      $(".partyAmountErrMsg").hide();
      $(".partyAmountWordsEl").text(convertAmountToWords($(this).val()));
    }
  });

  // chooseFilesCard

  let addedFilesList = [];

  let fileChoosenBoolean = false;

  $(".fileErrMsg").hide();
  $(".filesAddBtn").click(function () {
    $(".filesList").empty();
    if ($(".fileEl").val() === "") {
      $(".fileErrMsg").show().text("Please choose a file");
      fileChoosenBoolean = false;
    } else if (addedFilesList.includes($(".fileEl").val())) {
      fileChoosenBoolean = true;
      $(".fileErrMsg").show().text("This file already Added");
    } else if (!addedFilesList.includes($(".fileEl").val())) {
      addedFilesList = [...addedFilesList, $(".fileEl").val()];
      fileChoosenBoolean = true;
      $(".fileErrMsg").hide();
    }

    for (let i of addedFilesList) {
      $(".filesList")
        .append(`<li class="addedFile d-flex justify-content-between align-items-center bg-warning bg-opacity-10 p-2 rounded"><p class="m-0">${i}</p> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg fileCloseBtn" style="cursor:pointer" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg></li>`);

      $(".fileCloseBtn").click(function () {
        addedFilesList = addedFilesList.filter(
          (item) => item !== $(this).siblings().text()
        );
        $(this).parent().remove();
      });
    }
  });

  // logoutCard

  $(".logoutCard").click(function () {
    if ($(".logoutCard p").text() === "Logout") {
      $(".logoutCard p").text("Login");
    } else {
      $(".logoutCard p").text("Logout");
    }
  });

  // nextBtn

  $(".nextBtn").click(function () {
    if (partyAccountBoolean === false) {
      if ($(".partyErrMsg").text() === "") {
        $(".partyErrMsg").show().text("Please enter account no");
      } else {
        $(".partyErrMsg").show();
      }
    }
    if (ConfirmPartyAccountBoolean === false) {
      if ($(".confirmPartyAccountErrMsg").text() === "") {
        $(".confirmPartyAccountErrMsg").show().text("Please enter account no");
      } else {
        $(".confirmPartyAccountErrMsg").show();
      }
    }
    if (partyNameBoolean === false) {
      if ($(".partyNameErrMsg").text() === "") {
        $(".partyNameErrMsg").show().text("Please enter party name");
      } else {
        $(".partyNameErrMsg").show();
      }
    }
    if (bankIfscBoolean === false) {
      if ($(".bankIfscCardErrMsg").text() === "") {
        $(".bankIfscCardErrMsg").show().text("Please enter ifsc code");
      } else if ($(".bankName").text() !== "xxxx") {
        $(".bankIfscCardErrMsg").hide();
        bankIfscBoolean = true;
      } else {
        $(".bankIfscCardErrMsg").show();
      }
    }
    if (headOfAccountBoolean === false) {
      $(".headOfAccountErrMsg").show().text("Please selcet an option");
    }
    if (expenditureTypeBoolean === false) {
      $(".expenditureTypeErrMsg").show().text("Please selcet an option");
    }
    if (purposeTypeBoolean === false) {
      $(".purposeTypeErrMsg").show().text("Please selcet an option");
    }
    if (purposeBoolean === false) {
      $(".purposeErrMsg").show().text("Please enter purpose");
    }
    if (partyAmountBoolean === false) {
      if ($(".partyAmountErrMsg").text() === "") {
        $(".partyAmountErrMsg").show().text("Please party amount");
      } else {
        $(".partyAmountErrMsg").show();
      }
    }
    if (fileChoosenBoolean === false) {
      if (addedFilesList.length === 0) {
        $(".fileErrMsg").show().text("Please choose a file");
      } else {
        $(".fileErrMsg").show();
      }
    }
    if (
      partyAccountBoolean === true &&
      ConfirmPartyAccountBoolean === true &&
      partyNameBoolean === true &&
      bankIfscBoolean === true &&
      headOfAccountBoolean === true &&
      expenditureTypeBoolean === true &&
      purposeTypeBoolean === true &&
      purposeBoolean === true &&
      partyAmountBoolean === true &&
      fileChoosenBoolean === true
    ) {
      $(".partyAccountnoEL").val("");
      $(".confirmPartyAccountCardEl").val("");
      $(".partyNameEl").val("");
      $(".bankIfscCardEl").val("");
      $(".bankName").text("xxxx");
      $(".branchName").text("xxxx");
      $(".headOfAccountEL").val("");
      $(".headBalance").text("xxxx");
      $(".headLoc").text("xxxx");
      $(".expenditureTypeEl").val("");
      $(".purposeTypeEl").val("");
      $(".purposeEl").val("");
      $(".partyAmountEl").val("");
      $(".partyAmountWordsEl").text("Amount in words...");
      $(".filesList").empty();
      $(".fileEl").val("");
      $(".fileErrMsg").hide().text("");
      addedFilesList = [];
      partyAccountBoolean = false;
      ConfirmPartyAccountBoolean = false;
      partyNameBoolean = false;
      bankIfscBoolean = false;
      headOfAccountBoolean = false;
      expenditureTypeBoolean = false;
      purposeTypeBoolean = false;
      purposeBoolean = false;
      partyAmountBoolean = false;
      fileChoosenBoolean = false;
      alert("Successfull");
    }
  });
});
