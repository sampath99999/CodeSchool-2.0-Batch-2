function toggleSidebar(ref) {
  document.getElementById("sidebar").classList.toggle("active");
  document.querySelector(".sub-main-container").classList.toggle("active");

  const module = document.getElementById("moduleBox");
  const side = document.getElementById("sidebar");

  module.style.marginLeft = side.classList.contains("active")
    ? "270px"
    : "50px";
  module.style.transition = side.classList.contains("active")
    ? "margin-left 300ms linear"
    : "margin-left 300ms linear";
}

$(document).ready(function () {
  $("#partyAcNo").on("input", function () {
    const partyAcNo = $(this).val();
    const updatedNo = partyAcNo.replace(/[e.]/gi, "");

    $(this).val(updatedNo);
  });

  $("#confrimPartyAcNo").on("input", function () {
    const confrimPartyAcNo = $(this).val();
    const updatedConfirmNo = confrimPartyAcNo.replace(/[e.]/gi, "");

    $(this).val(updatedConfirmNo);
  });

  $("#payAmount").on("input", function () {
    const payAmount = $(this).val();
    const updatedPayAmount = payAmount.replace(/[e.]/gi, "");
    $(this).val(updatedPayAmount);
  });

  //Date
  const currentDate = new Date();
  const monthNames = [
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
  const date = `${currentDate.getDate()}-${
    monthNames[currentDate.getMonth()]
  }-${currentDate.getFullYear()}`;
  const time = `${currentDate.getHours()}:${currentDate.getMinutes()} ${
    currentDate.getHours() >= 12 ? "PM" : "AM"
  }`;
  $("#date").text(date);
  $("#time").text(time);

  //Login-logout
  $("#logOutBtn").click(function () {
    const btnText = $("#logOutBtn span").text();
    var updatedText = btnText === "Logout" ? "Login" : "Logout";
    $("#logOutBtn span").text(updatedText);
  });

  //Checkbox
  $(".checkbox").click(function () {
    if ($(this).prop("checked")) {
      $(".checkbox").not(this).prop("checked", false);
    }
  });

  //Head-of-account
  const data = {
    "0853001020002000000NVN": { balance: "1000000", loc: "5000" },
    "8342001170004001000NVN": { balance: "1008340", loc: "4000" },
    "2071011170004320000NVN": { balance: "14530000", loc: "78000" },
    "8342001170004002000NVN": { balance: "1056400", loc: "34000" },
    "2204000030006300303NVN": { balance: "123465400", loc: "5000" },
  };

  $("#headOfAccountSelect").change(function () {
    const selectItem = $("#headOfAccountSelect").val();

    const selectedData = data[selectItem];
    //  console.log(selectedData);

    if (selectedData) {
      $("#balence").text(selectedData.balance);
      $("#loc").text(selectedData.loc);
    } else {
      $("#balence").text("");
      $("#loc").text("");
    }
  });

  //Expenditure-purpose
  const purposeTypeOptions = {
    capital: [
      "Maintain current levels of operation within the organization",
      "Expenses to permit future expansion.",
    ],
    revenue: [
      "Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services.",
      "All expenses incurred by the firm to guarantee the smooth operation.",
    ],
    deferred: [
      "Exorbitant Advertising Expenditures",
      "Unprecedented Losses",
      "Development and Research Cost",
    ],
  };

  $("#expenditure").change(function () {
    const selectedExpenditure = $("#expenditure").val();

    $("#purpose").empty();

    if (selectedExpenditure in purposeTypeOptions) {
      purposeTypeOptions[selectedExpenditure].forEach(function (purposeText) {
        const option = $("<option>").val(purposeText).text(purposeText);
        $("#purpose").append(option);
      });
    }
  });
  //IFSC

  $("#searchBtn").click(function () {
    const ifsc = $("#ifscSearchInput").val();

    const ifscRegex = /^[A-Z]{4}0[A-Za-z0-9]{6}$/;

    if (!ifscRegex.test(ifsc)) {
      $("#ifscSearchInputErrorMsg").text(
        "*Invalid IFSC code. Please enter a valid IFSC code."
      );
      return;
    }

    const url = `https://ifsc.razorpay.com/${ifsc}`;

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function (data) {
        $("#bankName").text(data.BANK);
        $("#bankBranch").text(data.BRANCH);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Error fetching IFSC details,Please check the IFSC code and try again.",
          textStatus,
          errorThrown
        );
      },
    });
  });

  //Amount-in-words
  const numberInput = document.getElementById("payAmount");
  const wordsOutput = document.getElementById("payAmountWords");

  numberInput.addEventListener("input", function () {
    const inputNumber = parseInt(numberInput.value);
    const amountInWords = numberToWords(inputNumber);
    wordsOutput.value = amountInWords;
  });

  function numberToWords(n) {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    if (n === 0) {
      return "Zero";
    }

    function recursiveConvert(n) {
      if (n < 10) {
        return ones[n];
      } else if (n < 20) {
        return teens[n - 10];
      } else if (n < 100) {
        return (
          tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
        );
      } else {
        return (
          ones[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 !== 0 ? " " + recursiveConvert(n % 100) : "")
        );
      }
    }

    let result = "";
    let i = 0;
    while (n > 0) {
      if (n % 1000 !== 0) {
        result = recursiveConvert(n % 1000) + " " + thousands[i] + " " + result;
      }
      n = Math.floor(n / 1000);
      i++;
    }

    return result.trim();
  }

  //File
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

  //User-profile
  const customDropdown = document.querySelector(".custom-dropdown");
  const selectedOption = customDropdown.querySelector(".selected-option");
  const caretIcon = selectedOption.querySelector(".fa-caret-down");
  const options = customDropdown.querySelector(".options");
  const allOptions = customDropdown.querySelectorAll(".option");

  selectedOption.addEventListener("click", function () {
    options.style.display =
      options.style.display === "block" ? "none" : "block";
  });

  options.addEventListener("click", function (event) {
    const clickedOption = event.target.closest(".option");
    if (clickedOption) {
      const clickedContent = clickedOption.innerHTML;

      allOptions.forEach((option) => {
        if (option.innerHTML === clickedContent) {
          option.style.display = "none";
        } else {
          option.style.display = "block";
        }
      });

      selectedOption.innerHTML = clickedContent + caretIcon.outerHTML;
      caretIcon.style.display = "inline-block";
      options.style.display = "none";
    }
  });

  const nextBtnEl = document.getElementById("nextBtn");

  var transactionTypeValidate;
  var partyAcNoValidate;
  var confrimPartyAcNoValidate;
  var partyNameValidate;
  var payAmountValidate;
  var fileValidate;
  var headOfAccountValidate;
  var expenditureValidate;
  var purposeValidate;
  var ifscValidate;

  function ifscValidation(){
   const ifscCode =  $("#ifscSearchInput").val();
   console.log(ifscCode)
   if(ifscCode === ""){
    $("#ifscSearchInputErrorMsg").text("*Please enter IFSC code");
    ifscValidate=false;
   }else{
    $("#ifscSearchInputErrorMsg").text("");
    ifscValidate=true;
   }
  }

  function purposeValidation() {
    const purposeText = $("#floatingTextarea").val();
    if (purposeText === "") {
      $("#purposeErrorMsg").text("*Please enter a purpose");
      purposeValidate = false;
    } else {
      $("#purposeErrorMsg").text("");
      purposeValidate = true;
    }
  }

  function expenditureValidation() {
    const expenditureType = $("#expenditure").val();
    if (expenditureType === null) {
      $("#expenditureErrorMsg").text("*Please select an option");
      $("#purposeInputErrorMsg").text("*Please select an option");
      expenditureValidate = false;
    } else {
      $("#expenditureErrorMsg").text("");
      $("#purposeInputErrorMsg").text("");
      expenditureValidate = true;
    }
  }

  function headOfAccountValidation() {
    const selectedItem = $("#headOfAccountSelect").val();
    if (selectedItem === null) {
      $("#headOfAccountSelectErrorMsg").text("*Please select an option");
      headOfAccountValidate = false;
    } else {
      $("#headOfAccountSelectErrorMsg").text("");
      headOfAccountValidate = true;
    }
  }

  function fileValidation() {
    const fileInput = document.getElementById("inputGroupFile04");

    const selectedFile = fileInput.files[0];

    // console.log(selectedFile)
    if (!selectedFile) {
      $("#uploadDocsErrorMsg").text("*Please select a file.");
      fileValidate = false;
      return;
    } else {
      $("#uploadDocsErrorMsg").text("");
      fileValidate = true;
    }
  }

  function payAmountValidation() {
    const amount = $("#payAmount").val();

    if (amount === "") {
      $("#payAmountErrorMsg").text("*Amount must not be in empty");
      payAmountValidate = false;
    } else if (amount.includes(".")) {
      $("#payAmountErrorMsg").text("*Amount must not be in fractions");
      payAmountValidate = false;
    } else {
      $("#payAmountErrorMsg").text("");
      payAmountValidate = true;
    }
  }

  function partyNameValidation() {
    const partyName = $("#partyName").val();
    const specialCharRegex = /^[a-zA-Z\s]*$/;

    if (partyName === "") {
      $("#partyNameErrorMsg").text("*Name must not be empty");
      partyNameValidate = false;
    } else if (!specialCharRegex.test(partyName)) {
      $("#partyNameErrorMsg").text("*Name must not contain special charecters");
      partyNameValidate = false;
    } else {
      $("#partyNameErrorMsg").text("");
      partyNameValidate = true;
    }
  }

  function confrimPartyAcNoValidation() {
    const confrimPartyAcNo = $("#confrimPartyAcNo").val();
    const numRegex = /^(0|[1-9]\d{11,21})$/;
    const partyAcNo = $("#partyAcNo").val();

    if (confrimPartyAcNo === "") {
      $("#confrimPartyAcNoErrorMsg").text("*Account no must not be empty");
      confrimPartyAcNoValidate = false;
    } else if (!numRegex.test(partyAcNo)) {
      $("#confrimPartyAcNoErrorMsg").text("*Please enter a valid number");
      confrimPartyAcNoValidate = false;
    } else if (partyAcNo.length < 12 || partyAcNo.length > 22) {
      $("#confrimPartyAcNoErrorMsg").text(
        "*Account no must be between 12 to 22 digits"
      );
      confrimPartyAcNoValidate = false;
    } else if (confrimPartyAcNo !== partyAcNo) {
      $("#confrimPartyAcNoErrorMsg").text("*Account no do not match");
      confrimPartyAcNoValidate = false;
    } else {
      $("#confrimPartyAcNoErrorMsg").text("");
      confrimPartyAcNoValidate = true;
    }
  }

  function partyAcNoValidation() {
    const partyAcNo = $("#partyAcNo").val();
    const numRegex = /^(0|[1-9]\d{11,21})$/;

    if (partyAcNo === "") {
      $("#partyAcNoErrorMsg").text("*Account no must not be empty");
      partyAcNoValidate = false;
    } else if (!numRegex.test(partyAcNo)) {
      $("#partyAcNoErrorMsg").text(
        "*Should be min 12 and max 22 digits, and should only contain numbers"
      );
      partyAcNoValidate = false;
    } else if (partyAcNo.length < 12 || partyAcNo.length > 22) {
      $("#partyAcNoErrorMsg").text(
        "*Account no must be between 12 to 22 digits"
      );
      partyAcNoValidate = false;
    } else {
      $("#partyAcNoErrorMsg").text("");
      partyAcNoValidate = true;
    }
  }

  function transactionTypeValidation() {
    const checkboxes = document.querySelectorAll(".checkbox");
    let count = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        count++;
      }
    });

    if (count === 0) {
      $("#transactionTypeErrorMsg").text("*Please select a transaction type.");
      transactionTypeValidate = false;
    } else {
      transactionTypeValidate = true;
    }
  }

  nextBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    transactionTypeValidation();
    partyAcNoValidation();
    confrimPartyAcNoValidation();
    partyNameValidation();
    payAmountValidation();
    //  fileValidation();
    headOfAccountValidation();
    expenditureValidation();
    purposeValidation();
    ifscValidation();
  });

  $("#nextBtn").click(function () {
    if (
      transactionTypeValidate &&
      partyAcNoValidate &&
      confrimPartyAcNoValidate &&
      partyNameValidate &&
      payAmountValidate &&
      headOfAccountValidate &&
      expenditureValidate &&
      purposeValidate && 
      ifscValidate
    ) {
      alert("Payment done successfully");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const customDropdownSmall = document.querySelector(".custom-dropdown-sm");
  const selectedOptionSmall = customDropdownSmall.querySelector(
    ".selected-option-sm"
  );
  const caretIconSmall = selectedOptionSmall.querySelector(".sm-icon");
  const optionsSmall = customDropdownSmall.querySelector(".options-sm");
  const allOptionsSmall = customDropdownSmall.querySelectorAll(".option-sm");

  selectedOptionSmall.addEventListener("click", function () {
    optionsSmall.style.display =
      optionsSmall.style.display === "block" ? "none" : "block";
  });

  optionsSmall.addEventListener("click", function (event) {
    const clickedOption = event.target.closest(".option-sm");
    if (clickedOption) {
      const clickedContent = clickedOption.innerHTML;

      allOptionsSmall.forEach((option) => {
        if (option.innerHTML === clickedContent) {
          option.style.display = "none";
        } else {
          option.style.display = "block";
        }
      });

      selectedOptionSmall.innerHTML = clickedContent + caretIconSmall.outerHTML;
      caretIconSmall.style.display = "inline-block";
      optionsSmall.style.display = "none";
    }
  });
});
