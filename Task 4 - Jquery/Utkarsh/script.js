$(document).ready(function () {
  $("#submitBtn").click(function () {
    let partyAccNo = $("#partyAccNo").val();
    let confirmPartyAccNo = $("#confirmPartyAccNo").val();
    let partyName = $("#partyName").val();
    let ifscCode = $("#ifscCode").val();
    let headAccntType = $("#headAccntType").val();
    let expenditureType = $("#expenditureType").val();
    let purposeType = $("#purposeType").val();
    let enterPurpose = $("#enterPurpose").val();
    let partyAmount = $("#partyAmount").val();
    let uploadDocument = $("#uploadDocument").val();

    if (partyAccNo.length == 0) {
      $("#partyAccNoErr").html("Enter party account number");
      $("#partyAccNoErr").css("color", "red");
    } else if (partyAccNo.length <= 12 || partyAccNo.length >= 22) {
      $("#partyAccNoErr").html(
        "account number should be minimum 12 digits and maximum 22 digits"
      );
      $("#partyAccNoErr").css("color", "red");
    } else {
      $("#partyAccNoErr").css("display", "none");
    }

    if (confirmPartyAccNo.length == 0) {
      $("#confirmPartyAccNoErr").html("Confirm party account number");
      $("#confirmPartyAccNoErr").css("color", "red");
    } else if (partyAccNo !== confirmPartyAccNo) {
      $("#confirmPartyAccNoErr").html("Account numbers did not matched");
      $("#confirmPartyAccNoErr").css("color", "red");
    } else {
      $("#confirmPartyAccNoErr").css("display", "none");
    }

    if (partyName.length == 0) {
      $("#partyNameErr").html("Enter party name");
      $("#partyNameErr").css("color", "red");
    } else {
      $("#partyNameErr").css("display", "none");
    }

    if (ifscCode.length == 0) {
      $("#ifscCodeErr").html("enter the ifsc code");
      $("#ifscCodeErr").css("color", "red");
    } else {
      $("#ifscCodeErr").css("display", "none");
    }

    if (headAccntType.length == 0) {
      $("#headAccntErr").html("select the head of account");
      $("#headAccntErr").css("color", "red");
    } else {
      $("#headAccntErr").css("display", "none");
    }

    if (expenditureType.length == 0) {
      $("#expenditureTypeErr").html("select the expenditure type ");
      $("#expenditureTypeErr").css("color", "red");
    } else {
      $("#expenditureTypeErr").css("display", "none");
    }

    if (purposeType.length == 0) {
      $("#purposeTypeErr").html("select the purpose type ");
      $("#purposeTypeErr").css("color", "red");
    } else {
      $("#purposeTypeErr").css("display", "none");
    }

    if (enterPurpose.length == 0) {
      $("#purposeErr").html("Please give the purpose");
      $("#purposeErr").css("color", "red");
    } else {
      $("#purposeErr").css("display", "none");
    }

    if (partyAmount.length == 0) {
      $("#partyAmountErr").html("Enter the amount ");
      $("#partyAmountErr").css("color", "red");
    } else {
      $("#partyAmountErr").css("display", "none");
    }

    if (uploadDocument.length == 0) {
      $("#uploadDocumentErr").html("Upload the document ");
      $("#uploadDocumentErr").css("color", "red");
    } else {
      $("#uploadDocumentErr").css("display", "none");
    }
  });

  $("#menuIcon").click(function () {
    $(".rightContainer").toggleClass("col-md-12");
    $(".leftContainer").toggleClass("d-lg-none d-none d-sm-block");
  });

  $("#mobileIcon").click(function (event) {
    event.stopPropagation();
    $("#leftSide").click(function (event) {
      event.stopPropagation();
    });
    $("#leftSide").css({ position: "absolute", "z-index": "3000" });
    $("#rightSide").css({position: "static", opacity: "0.5",}); 
    $("#leftSide").attr("class", "d-block col-8");
    $("html").click(function (event) {
      $("#rightSide").css({ position: "static", "z-index": "1", opacity: "1" });
      $("#leftSide").attr("class", "d-none");
      $("body").css("overflow", "auto");
    });
  });

  function updateDateTime() {
    let currentDateTime = new Date();

    let options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let formattedDate = currentDateTime.toLocaleDateString(undefined, options);
    let formattedTime = currentDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    $("#datetime").html(
      "last login<br>" + formattedDate + "<br>" + formattedTime
    );
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  $("#logoutBtn").click(function () {
    let $changeText = $(".headerLogout p");

    if ($changeText.text() === "Logout") {
      $changeText.html("Login");
    } else if ($changeText.text() === "Login") {
      $changeText.html("Logout");ƒf
    }
  });

  $("#searchButton").click(function () {
    let ifscCode = $("#ifscCode").val();

    if (ifscCode.length == 0) {
      $("#ifscCodeErr").html("Enter IFSC code");
      $("#ifscCodeErr").css("color", "red");
    } else if (!/^[A-Z]{4}0[A-Za-z0-9]{6}$/.test(ifscCode)) {
      $("#ifscCodeErr").html("Invalid IFSC code format");
      $("#ifscCodeErr").css("color", "red");
    } else {
      $("#ifscCodeErr").css("display", "none");
      let url = "https://ifsc.razorpay.com/" + ifscCode;
      
      $.get(url, function (data, status) {
        if (status == "success") {
          let { BANK, BRANCH } = data;
          $("#bankName").html(`${BANK}`);
          $("#branchName").html(`${BRANCH}`);
        }
      });
    }
  });

  $("#headAccntType").change(function () {
    let headAccntType = $("#headAccntType").val();
    if (headAccntType == "0853001020002000000NVN") {
      $("#balance").html("1000000");
      $("#loc").html("5000");
    } else if (headAccntType == "8342001170004001000NVN") {
      $("#balance").html("1008340");
      $("#loc").html("4000");
    } else if (headAccntType == "2071011170004320000NVN") {
      $("#balance").html("14530000");
      $("#loc").html("78000");
    } else if (headAccntType == "8342001170004002000NVN") {
      $("#balance").html("1056400");
      $("#loc").html("34000");
    } else if (headAccntType == "2204000030006300303NVN") {
      $("#balance").html("123465400");
      $("#loc").html("5000");
    } else {
      $("#balance").html("XXXXX");
      $("#loc").html("XXXXX");
    }
  });

  $("#expenditureType").change(function () {
    let expenditureType = $("#expenditureType").val();
    if (expenditureType == "Capital Expenditure") {
      $("#purposeType").empty();
      $("#purposeType").append(`<option value="">Select</option>
      <option value="Maintain current levels of operation within the organization">Maintain current levels of operation within the organization</option>
      <option value="Expenses to permit future expansion">Expenses to permit future expansion</option>`);
    } else if (expenditureType == "Revenue Expenditure") {
      $("#purposeType").empty();
      $("#purposeType").append(`<option value="">Select</option>
      <option value=" Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services"> Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services</option>
      <option value="All expenses incurred by the firm to guarantee the smooth operation">All expenses incurred by the firm to guarantee the smooth operation</option>`);
    } else if (expenditureType == "Deferred Revenue Expenditure") {
      $("#purposeType").empty();
      $("#purposeType").append(`<option value="">Select</option>
      <option value="Exorbitant Advertising Expenditures">Exorbitant Advertising Expenditures</option>
      <option value="Unprecedented Losses">Unprecedented Losses</option>
      <option value="Development and Research Cost">Development and Research Cost</option>`);
    } else {
      $("#purposeType").empty();
      $("#purposeType").append(`<option value="">Select</option>`);
    }
  });

  $("#partyAmount").change(function () {
    function convertToWords(amount) {
      let ones = [
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
      let teens = [
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
      let tens = [
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

      function convertGroup(number) {
        if (number == 0) return "";
        else if (number < 10) return ones[number];
        else if (number < 20) return teens[number - 10];
        else if (number < 100)
          return tens[Math.floor(number / 10)] + " " + ones[number % 10];
        else
          return (
            ones[Math.floor(number / 100)] +
            " Hundred " +
            convertGroup(number % 100)
          );
      }
      let words = "";
      let crores = Math.floor(amount / 10000000);
      let lakhs = Math.floor((amount % 10000000) / 100000);
      let thousands = Math.floor((amount % 100000) / 1000);
      let remaining = Math.round(amount % 1000);

      if (crores > 0) {
        words += convertGroup(crores) + " Crore ";
      }

      if (lakhs > 0) {
        words += convertGroup(lakhs) + " Lakh ";
      }

      if (thousands > 0) {
        words += convertGroup(thousands) + " Thousand ";
      }

      if (remaining > 0) {
        words += convertGroup(remaining);
      }
      return words;
    }
    let partyAmount = $(this).val();
    partyAmount = parseInt(partyAmount);
    let words = convertToWords(partyAmount);
    $(this).val(words);
  });

  const maxFiles = 3;
  const input = $("#uploadDocument");
  const documentList = $("#documentSelected");
  const addFileButton = $("#addButton");
  let files = [];

  input.on("change", function (e) {
    const fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (files.length < maxFiles && !files.includes(file.name)) {
        files.push(file.name);
        addFileToInput(file.name);
      }
    }
    input.val(null);
  });
  
  addFileButton.on("click", function () {  
    const fileName = input.val();
    if (fileName && !files.includes(fileName)) {
      files.push(fileName);
      addFileElement(fileName);
      input.val(null);
    }
  });
  
  function addFileElement(fileName) {
    const fileDiv = $("<div></div>").addClass(
      "file-item bg-success bg-opacity-25 d-flex justify-content-between mt-1 p-1 "
    );
    
    const removeButton = $("<span></span>")
      .addClass("remove-button text-success text-opacity-75 ms-3 ")
      .html('<i class="fas fa-times"></i>');

    removeButton.on("click", function () {
      const fileName = $(this).siblings(".file-name").text();
      removeFile(fileName);
      $(this).closest(".file-item").remove();
    });
    
    fileDiv.append(String(fileName).slice(12));
    fileDiv.append(removeButton);
    documentList.append(fileDiv);
  }

  function removeFile(fileName) {
    const index = files.indexOf(fileName);
    if (index !== -1) {
      files.splice(index, 1);
    }
  }
});
