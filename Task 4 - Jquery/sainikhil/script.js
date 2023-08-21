$(document).ready(function () {
  var open = false;
  var logout = false;
  // side bar

  $("#menuBtn").click(function () {
    if (open === false) {
      $("#sideBar").css("width", "250px");
      $("#menuBtn").css("marginLeft", "250px");
      $("#content").css("marginLeft", "250px");
      $("#content").css("width", "85%");

      //   $("#content").addClass("col-10");

      open = true;
    } else {
      $("#sideBar").css("width", "0");
      $("#menuBtn").css("marginLeft", "0");
      $("#content").css("marginLeft", "0");
      $("#content").css("width", "100%");

      //   $("#content").removeClass("col-10");
      open = false;
    }
  });
  // last login
  function getCurrentFormattedDateTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.toLocaleString("default", { month: "short" });
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    var formattedDateTime = `<p class="text-secondary ms-3">Last Login</p>
                             <p >${day}-${month}-${year}</p>
                             <p class="ms-3">${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}</p>`;
    return formattedDateTime;
  }

  function updateDateTime() {
    var formattedDateTime = getCurrentFormattedDateTime();
    $("#lastLogin").html(formattedDateTime);
  }
  updateDateTime();

  //loginbtn
  $("#loginBtn").click(function () {
    if (logout === false) {
      $("#loginBtn").html(
        `<h6><i class="fa-solid fa-arrow-right-to-bracket"></i> Logout</h6>`
      );

      logout = true;
    } else {
      $("#loginBtn").html(
        `<h6><i class="fa-solid fa-arrow-right-to-bracket"></i>Login</h6>`
      );
      logout = false;
      updateDateTime();
    }
  });
  //Account Number Fields
  $("#partyAccountNumber, #confirmPartyAccountNumber").on(
    "input",
    function (event) {
      var inputValue = event.target.value;
      var replacedValue = inputValue.replace(/[^0-9]/g, "");
      $(this).val(replacedValue);
    }
  );
  //ifsccode
  $("#ifscCode").on("input", function (event) {
    var inputValue = event.target.value;
    var replacedIfsc = inputValue.replace(/[^A-Z0-9]/g, "");
    $(this).val(replacedIfsc);
  });
  $("#ifscSearch").click(function () {
    var ifscValue = $("#ifscCode").val();
    var bankName = $("#bankName");
    var bankBranch = $("#bankBranch");
    var url = `https://ifsc.razorpay.com/${ifscValue}`;
    console.log(url);
    $.get(url, function (data, textStatus, jqXHR) {
      if ((textStatus = 200)) {
        JSON.stringify(data);
        bankName.empty();
        bankBranch.empty();
        console.log(data.BRANCH);
        bankName.html(data.BANK);
        bankBranch.html(data.BRANCH);
      } else {
        bankName.empty();
        bankBranch.empty();
        bankName.html(`Check ifsc code`);
        bankBranch.html(`check ifsc code`);
      }
    });
  });
  //next button on click
  $("#nextBtn").click(function () {
    var partyAccountNumber = $("#partyAccountNumber").val();
    var confirmPartyAccountNumber = $("#confirmPartyAccountNumber").val();

    var partyAccountNumberError = $("#partyAccountNumberError");
    var confirmPartyAccountNumberError = $("#confirmPartyAccountNumberError");

    partyAccountNumberError.html("");
    confirmPartyAccountNumberError.html("");

    if (!validatePartyAccountNumber(partyAccountNumber)) {
      partyAccountNumberError.text("Invalid party account number.");
    }

    if (partyAccountNumber !== confirmPartyAccountNumber) {
      confirmPartyAccountNumberError.text(
        "Party account numbers do not match."
      );
    }
    //partyname
    var partyName = $("#partyName").val();
    var partyNameError = $("#partyNameError");

    partyNameError.text("");

    if (!validatePartyName(partyName)) {
      partyNameError.text("Invalid party name.");
    }
    //ifsc
    var ifscCode = $("#ifscCode").val();
    var ifscCodeError = $("#ifscCodeError");

    ifscCodeError.text("");

    if (!validateIFSCCode(ifscCode)) {
      ifscCodeError.text("Invalid IFSC Code.");
    }
    //towords
    var partyAmount = parseInt($("#partyAmount").val());
    var partyAmountInWords = convertToIndianWords(partyAmount);

    $("#partyAmountInWords").text(partyAmountInWords);
    console.log(partyAmountInWords);
  });

  function validatePartyAccountNumber(accountNumber) {
    return /^\d{12,22}$/.test(accountNumber);
  }
  //party name

  function validatePartyName(name) {
    return /^[A-Za-z0-9\s]+$/.test(name);
  }
  //ifsc
  function validateIFSCCode(code) {
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(code);
  }
  //head of account
  $("#headOfAccount").on("change", function () {
    var selectedValue = $(this).val();
    var balanceDiv = $("#balance");
    var locDiv = $("#loc");

    console.log(selectedValue);
    var accountData = getAccountData(selectedValue);

    if (accountData) {
      balanceDiv.html(`${accountData.balance}`);
      locDiv.text(`${accountData.loc}`);
    }
  });
  function getAccountData(accountCode) {
    var accountData = {
      "0853001020002000000NVN": { balance: "1000000", loc: "5000" },
      "8342001170004001000NVN": { balance: "1008340", loc: "4000" },
      "2071011170004320000NVN": { balance: "14530000", loc: "78000" },
      "8342001170004002000NVN": { balance: "1056400", loc: "34000" },
      "2204000030006300303NVN": { balance: "123465400", loc: "5000" },
    };
    return accountData[accountCode];
  }

  //purpose type
  var expenditureData = {
    CapitalExpenditure: [
      "Maintain current levels of operation within the organization",
      "Expenses to permit future expansion",
      "Revenue Expenditure",
    ],
    RevenueExpenditure: [
      "Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services",
      "All expenses incurred by the firm to guarantee the smooth operation",
    ],
    DeferredRevenueExpenditure: [
      "Exorbitant Advertising Expenditures",
      "Unprecedented Losses",
      "Development and Research Cost",
    ],
  };

  var expenditureTypeDropdown = $("#expenditureType");
  var purposeTypeDropdown = $("#purposeType");

  expenditureTypeDropdown.on("change", function () {
    var selectedExpenditureType = $(this).val();
    var purposeTypes = expenditureData[selectedExpenditureType];

    purposeTypeDropdown.empty();
    purposeTypeDropdown.html(
      $("<option>", {
        value: "selected",
        text: "Select",
      })
    );

    if (purposeTypes) {
      $.each(purposeTypes, function (index, purposeType) {
        purposeTypeDropdown.append(
          $("<option>", {
            value: purposeType,
            text: purposeType,
          })
        );
      });
    } else {
      purposeTypeDropdown.append(
        $("<option>", {
          value: "",
          text: "Select Expenditure Type first",
        })
      );
    }
  });

  //purpose
  var maxCharCount = 500;
  var purposeTextarea = $("#purpose");
  var charCountDiv = $("#charCount");
  var purposeErrorMessage = $("#purposeErrorMessage");

  purposeTextarea.on("input", function () {
    var currentCharCount = $(this).val().length;
    charCountDiv.text(`${currentCharCount}/${maxCharCount} characters`);
    console.log(currentCharCount);

    if (currentCharCount > maxCharCount) {
      purposeErrorMessage.text("Exceeded maximum character limit.");
    } else {
      purposeErrorMessage.text("");
    }
  });
  //fileuploader
  var fileList = [];

  $("#addButton").click(function () {
    $("#fileInput").click();
  });

  $("#fileInput").change(function (event) {
    var files = event.target.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var fileName = file.name;

      if (fileList.includes(fileName)) {
        alert(fileName + " is already uploaded.");
        continue;
      }

      fileList.push(fileName);

      var listItem = $(
        '<li class="list-group-item d-flex justify-content-between align-items-center">' +
          fileName +
          '<button type="button" class="btn btn-link remove-button" data-file="' +
          fileName +
          '">Remove</button></li>'
      );

      $("#fileList").append(listItem);

      listItem.find(".remove-button").click(function () {
        var removedFileName = $(this).data("file");
        fileList = fileList.filter(function (fileName) {
          return fileName !== removedFileName;
        });
        $(this).parent().remove();
      });
    }

    $(this).val("");
  });

  // amount in words

  function convertToIndianWords(number) {
    const words = [
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
      "Ten",
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
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (number === 0) {
      return "Zero";
    }

    if (number < 20) {
      return words[number];
    }

    if (number < 100) {
      return (
        tens[Math.floor(number / 10)] +
        (number % 10 !== 0 ? " " + words[number % 10] : "")
      );
    }

    if (number < 1000) {
      return (
        words[Math.floor(number / 100)] +
        " Hundred" +
        (number % 100 !== 0 ? " and " + convertToIndianWords(number % 100) : "")
      );
    }

    if (number < 100000) {
      return (
        convertToIndianWords(Math.floor(number / 1000)) +
        " Thousand" +
        (number % 1000 !== 0 ? " " + convertToIndianWords(number % 1000) : "")
      );
    }

    if (number < 10000000) {
      return (
        convertToIndianWords(Math.floor(number / 100000)) +
        " Lakh" +
        (number % 100000 !== 0
          ? " " + convertToIndianWords(number % 100000)
          : "")
      );
    }

    return (
      convertToIndianWords(Math.floor(number / 10000000)) +
      " Crore" +
      (number % 10000000 !== 0
        ? " " + convertToIndianWords(number % 10000000)
        : "")
    );
  }
});
