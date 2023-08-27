$(document).ready(function () {
    const hamburgerButton = $("#hamburgerButton");
    const menuSidebar = $("#menuSidebar");
    const mainBody = $(".mainBody");
  
    hamburgerButton.click(function () {
      if (menuSidebar.hasClass("d-md-block")) {
        menuSidebar.removeClass("d-md-block").addClass("d-md-none");
        mainBody.removeClass("col-md-10").addClass("col-md-12");
      } else {
        menuSidebar.removeClass("d-md-none").addClass("d-md-block");
        mainBody.removeClass("col-md-12").addClass("col-md-10");
      }
    });
    $("#hamburgerMobileButton").click(function (event) {
      $("body").css("overflow", "hidden");
      event.stopPropagation();
      $("#menuSidebar").click(function (event) {
        event.stopPropagation();
      });
      $("#menuSidebar").css({ position: "absolute", "z-index": "3000" });
      $("#mainBody").css({
        position: "static",
        "z-index": "0",
        opacity: "0.5",
      });
      $("#menuSidebar").attr("class", "d-block col-8");
      $("html").click(function (event) {
        $("#mainBody").css({ position: "static", "z-index": "1", opacity: "1" });
        $("#menuSidebar").attr("class", "d-none");
        $("body").css("overflow", "auto");
      });
    });
    $("#logoutButton").click(function () {
      var $logoutButton = $(this);
      var $logoutText = $logoutButton.find(".logoutText");
      var $logoutIcon = $logoutButton.find(".logoutIcon");
  
      if ($logoutText.text() === "Logout") {
        $logoutText.text("Login");
        $logoutIcon
          .removeClass("fa-arrow-right-from-bracket")
          .addClass("fa-arrow-right-to-bracket");
      } else {
        $logoutText.text("Logout");
        $logoutIcon
          .removeClass("fa-arrow-right-to-bracket")
          .addClass("fa-arrow-right-from-bracket");
      }
    });
    const now = new Date();
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
    const formattedDate = `${now.getDate()}-${
      months[now.getMonth()]
    }-${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  
    $("#lastLogin").append(`${formattedDate}<li>${formattedTime}</li>`);
    $(document).ready(function () {
      $("#searchButton").click(function () {
        const bankIFSC = $("#bankIFSC").val();
  
        if (bankIFSC.length === 11 && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankIFSC)) {
          fetchBankDetails(bankIFSC);
        } else if (bankIFSC.length === 0) {
          $("#bankIFSCError").text("IFSC code is required.");
        } else {
          $("#bankIFSCError").text("Invalid IFSC Code.");
        }
      });
    });
    function fetchBankDetails(ifscCode) {
      $.get(`https://ifsc.razorpay.com/${ifscCode}`, function (data) {
        $("#bankName").val(data.BANK);
        $("#bankBranch").val(data.BRANCH);
        $("#bankDetailsContainer").show();
        $("#bankIFSCError").empty();
      }).fail(function () {
        $("#bankIFSCError").text("IFSC Code is invalid or API error.");
      });
    }
    $("#headOfAccount").change(function () {
      const selectedOption = $(this).val();
      $("#balance").val("");
      $("#loc").val("");
      if (selectedOption === "0853001020002000000NVN") {
        $("#balance").val("1000000");
        $("#loc").val("5000");
      } else if (selectedOption === "8342001170004001000NVN") {
        $("#balance").val("1008340");
        $("#loc").val("4000");
      } else if (selectedOption === "2071011170004320000NVN") {
        $("#balance").val("14530000");
        $("#loc").val("78000");
      } else if (selectedOption === "8342001170004002000NVN") {
        $("#balance").val("1056400");
        $("#loc").val("34000");
      } else if (selectedOption === "2204000030006300303NVN") {
        $("#balance").val("123465400");
        $("#loc").val("5000");
      }
    });
    const purposeTypeOptions = {
      option1: [
        "select",
        "Maintain current levels of operation within the organization",
        "Expenses to permit future expansion",
      ],
      option2: [
        "select",
        "Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services.",
        "All expenses incurred by the firm to guarantee the smooth operation.",
      ],
      option3: [
        "select",
        "Exorbitant Advertising Expenditures",
        "Unprecedented Losses",
        "Development and Research Cost",
      ],
    };
  
    $("#expenditureType").change(function () {
      const selectedExpenditureType = $(this).val();
      const purposeTypeSelect = $("#purposeType");
      purposeTypeSelect.empty();
  
      if (selectedExpenditureType) {
        const purposeOptions = purposeTypeOptions[selectedExpenditureType];
        $.each(purposeOptions, function (index, option) {
          purposeTypeSelect.append(
            $("<option>", {
              value: option.toLowerCase().replace(/\s/g, "-"),
              text: option,
            })
          );
        });
      } else {
        purposeTypeSelect.append(
          $("<option>", {
            value: "",
            text: "select",
          })
        );
      }
  
      $("#expenditureTypeError").empty();
    });
  
    $("#partyAmount").on("input", function () {
      var inputVal = $(this).val();
      var numericVal = inputVal.replace(/[^0-9]/g, "");
      $(this).val(numericVal);
  
      var words = partyAmountInWords(parseInt(numericVal));
      $("#partyAmountInWords").val(words);
    });
    function partyAmountInWords(amount) {
      var ones = [
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
      var teens = [
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
      var tens = [
        "",
        "Ten",
        "Twenty",
        "Thirty",
        "Fourty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];
  
      function numbersToWords(number) {
        if (number === 0) return "";
        else if (number < 10) return ones[number];
        else if (number < 20) return teens[number - 10];
        else if (number < 100)
          return tens[Math.floor(number / 10)] + " " + ones[number % 10];
        else
          return (
            ones[Math.floor(number / 100)] +
            " Hundred " +
            numbersToWords(number % 100)
          );
      }
      var words = "";
      var crores = Math.floor(amount / 10000000);
      var lakhs = Math.floor((amount % 10000000) / 100000);
      var thousands = Math.floor((amount % 100000) / 1000);
      var remaining = Math.round(amount % 1000);
  
      if (crores > 0) {
        words += numbersToWords(crores) + " Crore ";
      }
  
      if (lakhs > 0) {
        words += numbersToWords(lakhs) + " Lakh ";
      }
  
      if (thousands > 0) {
        words += numbersToWords(thousands) + " Thousand ";
      }
  
      if (remaining > 0) {
        words += numbersToWords(remaining);
      }
  
      return words;
    }
    var initialAmount = parseInt(
      $("#partyAmount")
        .val()
        .replace(/[^0-9]/g, "")
    );
    if (!isNaN(initialAmount)) {
      var initialWords = partyAmountInWords(initialAmount);
      $("#partyAmountInWords").val(initialWords);
    }
  
    const maxFiles = 6;
    const input = $("#documents");
    const documentList = $("#documentList");
    const addFileButton = $("#addFileInput");
    const files = [];
    addFileButton.on("click", function () {
      input.click();
    });
    input.on("change", function (e) {
      const fileList = e.target.files;
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (files.length < maxFiles && !files.includes(file.name)) {
          files.push(file.name);
          addFileElement(file);
        }
      }
      input.val(null);
    });
  
    function addFileElement(file) {
      const fileDiv = $("<div></div>").addClass(
        "file-item bg-success bg-opacity-25 d-flex justify-content-between mt-1 p-1 "
      );
      const fileName = $("<span></span>")
        .addClass("file-name text-success text-opacity-75")
        .text(file.name);
      const removeButton = $("<span></span>")
        .addClass("remove-button text-success text-opacity-75 ms-3 ")
        .html('<i class="fas fa-times"></i>');
  
      removeButton.on("click", function () {
        const fileName = $(this).siblings(".file-name").text();
        removeFile(fileName);
        $(this).closest(".file-item").remove();
      });
      fileDiv.append(fileName);
      fileDiv.append(removeButton);
      documentList.append(fileDiv);
    }
  
    function removeFile(fileName) {
      const index = files.indexOf(fileName);
      if (index !== -1) {
        files.splice(index, 1);
      }
    }
  
    $(".nextBtn").click(function (event) {
      let isValid = true;
      $(".text-danger").text("");
  
      const selectedTransactionType = $(
        "input[name='transactionType']:checked"
      ).val();
      if (!selectedTransactionType) {
        $("#transactionTypeError").text("Select any one Transaction Type.");
        isValid = false;
      }
      let partyAccount = $("#partyAccount").val();
      if (partyAccount === "") {
        $("#partyAccountError").text("Party Account number is required.");
      } else if (
        partyAccount.length < 12 ||
        partyAccount.length > 22 ||
        !/^\d+$/.test(partyAccount)
      ) {
        $("#partyAccountError").text("Party Account number is invalid.");
        isValid = false;
      }
      let confirmPartyAccount = $("#confirmPartyAccount").val();
      if (confirmPartyAccount === "") {
        $("#confirmPartyAccountErrorr").text(
          "Confirm Party Account number is required."
        );
      } else if (confirmPartyAccount !== partyAccount) {
        $("#confirmPartyAccountError").text(
          "Confirm Party Account number does not match."
        );
        isValid = false;
      }
      let partyName = $("#partyName").val();
      if (partyName == "") {
        $("#partyNameError").text("Party Name is required.");
      } else if (!/^[A-Za-z\s]+$/.test(partyName)) {
        $("#partyNameError").text("Special characters are not allowed.");
        isValid = false;
      }
      let bankIFSC = $("#bankIFSC").val();
      if (bankIFSC == "") {
        $("#bankIFSCError").text("IFSC code is required.");
        isValid = false;
      }
      let headOfAccount = $("#headOfAccount").val();
      if (headOfAccount === "") {
        $("#headOfAccountError").text("Please select a Head of Account.");
        isValid = false;
      }
      let expenditureType = $("#expenditureType").val();
      if (expenditureType === "") {
        $("#expenditureTypeError").text("Please select an Expenditure Type.");
        isValid = false;
      }
      let purposeType = $("#purposeType").val();
      if (purposeType === "") {
        $("#purposeTypeError").text("Please select a Purpose Type.");
        isValid = false;
      }
      let purposeDescription = $("#purposeDescription").val();
      if (purposeDescription === "") {
        $("#purposeError").text("Please enter a Purpose .");
      } else if (purposeDescription.length > 500) {
        $("#purposeError").text(
          "Purpose Description shouldn't exceed 500 words."
        );
        isValid = false;
      }
      let partyAmount = $("#partyAmount").val();
      if (partyAmount === "") {
        $("#partyAmountError").text("Please enter some Party Amount.");
      } else if (partyAmount.includes(".") || isNaN(partyAmount)) {
        $("#partyAmountError").text(
          "Party Amount should be a valid number without fractions."
        );
        isValid = false;
      }
      const fileInput = $("#documents")[0];
      if (fileInput.files.length === 0) {
        $("#documentsError").text(
          "Error: No file selected. Please choose a file."
        );
      } else {
        $("#documentsError").text("");
      }
  
      if (!isValid) {
        event.preventDefault();
      }
    });
  });
  