// $(".header").css({"background":`url(https://d20exy1ygbh3sg.cloudfront.net/fms/images/newUi/header-bg.jpg)`});

let nav = false;
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  //  document.getElementById("content").style.marginLeft = "250px";
  document.getElementById("content").classList.add("content-margin");
  nav = false;
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("content").classList.remove("content-margin");
  nav = true;
}

function toggleNav() {
  nav ? openNav() : closeNav();
}

// Party Account Number Validation
function validatePartyAccountNo() {
  const partyAccountNumber = $("#partyAccountNumber").val();
  // console.log(partyAccountNumber.length)
  if (partyAccountNumber.length < 12 || partyAccountNumber.length > 22) {
    $("#accountErrorText").text(
      "*Account Number must be min 12 and max 22 digits"
    );
    $("#partyAccountNumber").val("");
    return false;
  } else {
    $("#accountErrorText").text("");
    return true;
  }
}

// Confirm Party Account Number Validation

function validateConfirmPartyAccountNo() {
  const confirmPartyAccountNumber = $("#confirmPartyAccountNumber").val();
  const partyAccountNumber = $("#partyAccountNumber").val();

  if (partyAccountNumber != confirmPartyAccountNumber) {
    $("#confirmAccountErrorText").text("*Party Account Number did not match");
    $("#confirmPartyAccountNumber").val("");
    return false;
  } else if (
    confirmPartyAccountNumber.length < 12 ||
    confirmPartyAccountNumber.length > 22
  ) {
    $("#confirmAccountErrorText").text(
      "*Account Number must be min 12 and max 22 digits"
    );
    $("#confirmPartyAccountNumber").val("");
    return false;
  } else {
    $("#confirmAccountErrorText").text("");
    return true;
  }
}

function validatePartyName() {
  const partyName = $("#partyName").val();
  const pattern = /^[a-zA-Z\s]*$/;
  // console.log(partyAccountNumber.length)
  if (partyName.length == 0) {
    $("#partyNameErrorText").text("*Party Name must not be empty");
    $("#partyName").val("");
    return false;
  } else if (!pattern.test(partyName)) {
    $("#partyNameErrorText").text(
      "*Party Name must not contain special characters"
    );
    $("#partyName").val("");
  } else {
    $("#partyNameErrorText").text("");
    return true;
  }
}

function validateIFSCCode() {
  const IFSCCode = $("#IFSCCode").val();
  const regex = /^[A-Z]{4}0[A-Za-z0-9]{6}$/;
  console.log(IFSCCode);
  console.log(regex.test(IFSCCode));
  if (!regex.test(IFSCCode)) {
    $("#IFSCCode").val("");
    $("#IFSCErrorText").text("*Enter Valid IFSC Code");
    return false;
  } else {
    $("#IFSCErrorText").text("");
    return true;
  }
}

// validate Expenditure Type
function validateExpenditureType() {
  const value = $("#type").val();
  console.log(value);
  if (value == "select") {
    $("#expenditureTypeErrorText").text("*Select Expenditure Type ");
    return false;
  }
  $("#expenditureTypeErrorText").text("");
  return true;
}

// validate Purpose Type
function validatePurposeType() {
  const value = $("#purpose").val();
  console.log(value);
  if (value == "select") {
    $("#purposeTypeErrorText").text("*Select Purpose Type ");
    return false;
  }
  $("#purposeTypeErrorText").text("");
  return true;
}

// Head of Account
function validateHeadOfAccount() {
  const value = $("#headOfAccount").val();
  if (value == "select") {
    $("#headOfAccountErrorText").text("*Select Head of Account");
    return false;
  }
  $("#headOfAccountErrorText").text("");
  return true;
}

// Convert number to words
// function convertNumberToWords(number) {
//     const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
//     const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
//     const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
//     const thousands = ["", "Thousand", "Lakh", "Crore"];

// //   function convertChunk(chunk) {
// //     const hundreds = Math.floor(chunk / 100);
// //     const remainder = chunk % 100;

// //     let chunkWords = "";

// //     if (hundreds > 0) {
// //       chunkWords += units[hundreds] + " hundred";
// //     }

// //     if (remainder > 0) {
// //       if (remainder < 10) {
// //         chunkWords += (hundreds > 0 ? " and " : "") + units[remainder];
// //       } else if (remainder >= 11 && remainder <= 19) {
// //         chunkWords += (hundreds > 0 ? " and " : "") + teens[remainder - 10];
// //       } else {
// //         chunkWords +=
// //           (hundreds > 0 ? " and " : "") + tens[Math.floor(remainder / 10)];
// //         if (remainder % 10 > 0) {
// //           chunkWords += " " + units[remainder % 10];
// //         }
// //       }
// //     }

// //     return chunkWords;
// //   }

// //   const chunks = [];
// //   while (num > 0) {
// //     chunks.push(num % 1000);
// //     num = Math.floor(num / 1000);
// //   }

// //   const wordsArray = chunks.map((chunk, index) => {
// //     const chunkWords = convertChunk(chunk);
// //     if (chunkWords) {
// //       return chunkWords + " " + thousands[index];
// //     }
// //     return "";
// //   });

// //   return wordsArray.reverse().join(" ");
// function convertChunk(number) {
//     if (number === 0) {
//         return "";
//     } else if (number < 10) {
//         return ones[number];
//     } else if (number < 20) {
//         return teens[number - 10];
//     } else if (number < 100) {
//         return tens[Math.floor(number / 10)] + " " + ones[number % 10];
//     } else {
//         return ones[Math.floor(number / 100)] + " Hundred " + convertChunk(number % 100);
//     }
// }

// const chunks = [];
// while (number > 0) {
//     chunks.push(number % 1000);
//     number = Math.floor(number / 1000);
// }

// if (chunks.length === 0) {
//     return "Zero";
// }

// const words = [];
// for (let i = chunks.length - 1; i >= 0; i--) {
//     if (chunks[i] !== 0) {
//         words.push(convertChunk(chunks[i]) + " " + thousands[i]);
//     }
// }

// return words.join(" ");
// }
const convertNumberToWords= (num) => {
    const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const formatTenth = (digit, prev) => {
       return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
    };
    const formatOther = (digit, next, denom) => {
       return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
    };
    let res = "";
    let index = 0;
    let digit = 0;
    let next = 0;
    let words = [];
    if (num += "", isNaN(parseInt(num))){
       res = "";
    }
    else if (parseInt(num) > 0 && num.length <= 10) {
       for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
          case 0:
             words.push(formatOther(digit, next, ""));
          break;
          case 1:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 2:
             words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
             break;
          case 3:
             words.push(formatOther(digit, next, "Thousand"));
             break;
          case 4:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 5:
             words.push(formatOther(digit, next, "Lakh"));
             break;
          case 6:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 7:
             words.push(formatOther(digit, next, "Crore"));
             break;
          case 8:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 9:
             words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
       };
       res = words.reverse().join("")
    } else res = "";
    return res
 };

// validate Purpose
function validatePurpose() {
  const purpose = $("#purposeTextArea").val();

  console.log($("#purposeTextArea"));
  console.log(purpose.length);
  if (purpose.length == 0) {
    $("#purposeErrorText").text("*Purpose cannot be left empty");
    return false;
  }
  $("#purposeErrorText").text("");
  return true;
}
// Validate Amount
function validatePartyAmount() {
  const amount = $("#partyAmount").val();
  console.log(amount);
  const regex = /^\d+(?:\.\d+)?$/;
  if (amount.length == 0) {
    $("#partyAmountErrorText").text("*Enter Party Amount");
    return false;
  } else if (!regex.test(amount)) {
    $("#partyAmountErrorText").text(
      "*Party Amount Should not be in Fractions."
    );
    $("#partyAmount").val("");
    return false;
  }
  $("#partyAmountErrorText").text("");
  return true;
}
$(function () {
  //header
  $(".header").css({
    "background-image":
      "url('https://d20exy1ygbh3sg.cloudfront.net/fms/images/newUi/header-bg.jpg')",
    height: "60px",
  });

  // small devies navbar
  $(".ifmis-logo-image").css({ height: "50px" });
  $(".navbar-bars-icon-small").css({
    "text-decoration": "none",
    "font-size": "18px",
  });

  $(".header").css({
    padding: "15px",
    display: "flex",
    "align-items": "center",
    color: "white",
  });
  $(".selected").css({
    "background-color": "rgb(224 218 218 / 10%)",
    "border-left": "1px solid orange",
  });
  // modules
  $(".blocks-image").css({ height: "20px", "margin-right": "5px" });
  $(".modules").css({
    "background-color": "rgb(128, 128, 128,0.3)",
    "border-radius": "5px",
    display: "flex",
    "align-items": "center",
    padding: "12px 8px",
    "margin-left": "20px",
  });

  // last login
  $(".last-login").css({ color: "#baa7a7", "font-size": "12px" });
  $(".date").css({ "font-size": "13px" });
  $(".time").css({ "font-size": "13px" });

  // login logout
  $(".login-container").css({
    "background-color": "rgb(128, 128, 128,0.3)",

    "margin-left": "18px",
  });

  // user logo
  $(".user-logo-image").css({ height: "30px", "margin-right": "10px" });
  $(".account-number-dropdown").css({
    background: "none",
    border: "none",
    color: "rgb(226 218 218)",
    "font-size": "12px",
  });
  $(".user-logo-name").css({ color: "rgb(226 218 218)", "font-size": "12px" });

  // points
  $(".points").css({ "background-color": "rgb(255 250 221)", padding: "20px" });
  $(".points-title").css({ "font-size": "20px", "font-weight": "bold" });
  $(".points-list li").css({ color: "brown", "font-size": "13px" });
  $(".points-list li span").css({ color: "black" });
  // login logout button

  $("#login").click(function () {
    $(this).text($(this).text() == "Login" ? "Logout" : "Login");
  });

  $(".issue-cheque").css({
    color: "#0b6deb",
    "background-color": "rgb(203 225 254)",
    "font-weight": "700",
    margin: "15px",
    padding: "10px",
  });
  // Transaction Type
  $(".transaction-details").css({
    "background-color": "#f1f5fd",
    padding: "10px",
  });
  $(".form-title").css({ color: "#130155", "font-weight": "500" });
  $(".account-input").css({ width: "70%" });
  $(".required").css({ color: "red" });
  $(".account-numbers").css({ padding: "10px", "margin-bottom": "8px" });
  $(".account-details").css({ padding: "20px" });

  // IFSC Code
  $(".ifsc-code-details").css({
    "background-color": "rgb(241, 245, 253)",
    padding: "10px",
  });
  $(".ifsc-details").css({ padding: "10px" });

  // Head of Account Details
  $(".head-of-account-details").css({ padding: "10px" });
  $(".rupees").css({ color: "grey", "font-size": "14px" });
  // error text
  $(".error-text").css({ color: "red" });
  // note
  $(".note").css({
    "font-style": "italic",
    color: "grey",
    "margin-top": "10px",
    "font-size": "14px",
    "font-weight": "500",
  });
  toggleNav();
  // Get Date from datetime
  function formatDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
  }
  // Get time from datetime
  function getTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let twelveHourFormat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    console.log(hours + ":" + minutes + " " + twelveHourFormat);
    return hours + ":" + minutes + " " + twelveHourFormat;
  }

  const date = new Date();
  const formattedDate = formatDate(date);
  $(".date").text(formattedDate);
  $(".time").text(getTime(date));

  $(".email-slide").toggle(
    function () {
      $(this).text("Close");
    },
    function () {
      $(this).text("Email");
    }
  );

  // IFSC Search button

  $("#IFSCsearch").click(function () {
    IFSCSearch = validateIFSCCode();
    if (IFSCSearch) {
      const searchText = $("#IFSCCode").val();
      const url = `https://ifsc.razorpay.com/${searchText}`;     

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $("#bank").text(data.BANK);
            $("#branch").text(data.BRANCH);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(
            "Error fetching IFSC details,Please check the IFSC code and try again.",
            textStatus,
            errorThrown
          );
        },
      });
    }
  });

  // Head of Account
  $('select[name="account"]').on("change", function () {
    const value = this.value;

    if (value == "account1") {
      $("#balance").text("1000000");
      $("#loc").text("5000");
    } else if (value == "account2") {
      $("#balance").text("1008340");
      $("#loc").text("4000");
    } else if (value == "account3") {
      $("#balance").text("14530000");
      $("#loc").text("78000");
    } else if (value == "account4") {
      $("#balance").text("1056400 ");
      $("#loc").text("34000");
    } else {
      $("#balance").text("123465400");
      $("#loc").text("5000");
    }
  });

  // Expenditure and Purpose Type

  $("#type").change(function () {
    var val = $(this).val();
    if (val == "capital") {
      $("#purpose").html(
        "<option value='select'>Select</option><option value='current-levels'>Maintain current levels of operation within the organization</option><option value='test2'> Expenses to permit future expansion.</option>"
      );
    } else if (val == "revenue") {
      $("#purpose").html(
        "<option value='select'>Select</option><option value='sales-cost'>Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services.</option><option value='expenses-incurred'>All expenses incurred by the firm to guarantee the smooth operation.</option>"
      );
    } else if (val == "deferred") {
      $("#purpose").html(
        "<option value='select'>Select</option><option value='advertising'>Exorbitant Advertising Expenditures</option><option value='unprecedented'>Unprecedented Losses</option><option value='research'>Development and Research Cost</option>"
      );
    } else if (val == "select") {
      $("#purpose").html("<option value='select'>Select</option>");
    }
  });

  $("#partyAmount").on("input", function () {
    const valid = validatePartyAmount();
    if (valid) {
      console.log("valid");
      const number=$("#partyAmount").val();
      let words;
      if(number==0)
      {
        words="zero"
      }
      else{
       words = convertNumberToWords(parseInt($("#partyAmount").val()));
      }

      $("#partyAmountInWords").val(words);
    } else {
      $("#partyAmountInWords").val("");
    }
  });

  // Party Account Numbers Validation
  $("#verify").click(function () {
    validatePartyAccountNo();
    validateConfirmPartyAccountNo();
    validatePartyName();
    validateIFSCCode();
    validateHeadOfAccount();
    validateExpenditureType();
    validatePurposeType();
    validatePartyAmount();
    validatePurpose();
  });

  const addButton = document.getElementById("inputGroupFileAddon04");
  const fileInput = document.getElementById("inputGroupFile04");
  const fileList = document.getElementById("fileList");
  const errorMsg = document.getElementById("uploadDocsErrorMsg");
  const addedFilesEl = document.getElementById("addedFiles");

  addButton.addEventListener("click", function () {
    const selectedFile = fileInput.files[0];
    //selectedFile gives undefined
    if (!selectedFile) {
      errorMsg.textContent = "*Please select a file.";
      return;
    }

    const fileName = selectedFile.name;
    const existingFile = Array.from(fileList.children).find(
      (element) => element.textContent === fileName
    );

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
});
