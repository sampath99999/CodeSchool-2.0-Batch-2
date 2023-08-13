$(document).ready(function () {
    $("#menuIcon").click(function () {
        $("#onlyMenubar").toggleClass("d-md-none");
        $("#exceptMenubar").toggleClass("col-md-12");
    });
    var currentDate = new Date();
    var dateNumber = currentDate.getDate();
    var monthNumber = currentDate.getMonth();
    var yearNumber = currentDate.getFullYear();
    var hourNumber = currentDate.getHours();
    var minutesNumber = currentDate.getMinutes();
    var monthText = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    currentDate = dateNumber + "-" + monthText[monthNumber] + "-" + yearNumber;
    minutesNumber = String(minutesNumber);
    if (minutesNumber.length == 1) {
        minutesNumber = 0 + minutesNumber;
    }
    if (hourNumber == 0) {
        var currentTime = hourNumber + 12 + ":" + minutesNumber + " AM";
    } else if (hourNumber < 12) {
        var currentTime = hourNumber + ":" + minutesNumber + " AM";
    } else if (hourNumber === 12) {
        var currentTime = hourNumber + ":" + minutesNumber + " PM";
    } else {
        var currentTime = hourNumber - 12 + ":" + minutesNumber + " PM";
    }
    $("#currentDate").append(
        `<p class="my-0">` +
        currentDate +
        `</p><p class="my-0">` +
        currentTime +
        `</p>`
    );
    var flag = 0;
    $("#loginViceversa").click(function () {
        if (flag == 0) {
            $(this).empty();
            $(this).append(`<i class="fas fa-sign-in"></i> Login`);
            flag = 1;
        } else {
            $(this).empty();
            $(this).append(`<i class="fas fa-sign-out"></i> Logout`);
            flag = 0;
        }
    });
    $("#mobileMenuIcon").click(function (event) {
        event.stopPropagation();
        $("#onlyMenubar").click(function (event) {
            event.stopPropagation();
        });
        $("#onlyMenubar").css({ position: "absolute", "z-index": "2000" });
        $("#exceptMenubar").css({
            position: "absolute",
            "z-index": "-1",
            opacity: "0.5",
        });
        $("#onlyMenubar").attr("class", "d-block col-8");
        $("html").click(function (event) {
            $("#exceptMenubar").css({
                position: "static",
                "z-index": "1",
                opacity: "1",
            });
            $("#onlyMenubar").attr("class", "d-none");
            console.log("clicked");
        });
    });

    $("#headOfAccount").change(function () {
        var headOfAccount = [
            "",
            "0853001020002000000NVN",
            "8342001170004001000NVN",
            "2071011170004320000NVN",
            "8342001170004002000NVN",
            "2204000030006300303NVN",
        ];
        var headOfAccountIndex = $(this).val();
        if (headOfAccount[headOfAccountIndex] == "0853001020002000000NVN") {
            $("#balance").text("1000000");
            $("#loc").text("5000");
        } else if (headOfAccount[headOfAccountIndex] == "8342001170004001000NVN") {
            $("#balance").text("1008340");
            $("#loc").text("4000");
        } else if (headOfAccount[headOfAccountIndex] == "2071011170004320000NVN") {
            $("#balance").text("14530000");
            $("#loc").text("78000");
        } else if (headOfAccount[headOfAccountIndex] == "8342001170004002000NVN") {
            $("#balance").text("1056400");
            $("#loc").text("34000");
        } else if (headOfAccount[headOfAccountIndex] == "2204000030006300303NVN") {
            $("#balance").text("123465400");
            $("#loc").text("5000");
        } else {
            $("#balance").text("XXXXX");
            $("#loc").text("XXXXX");
        }
    });
    $("#expenditureType").change(function () {
        var expenditureType = [
            "",
            "Capital Expenditure",
            "Revenue Expenditure",
            "Deferred Revenue Expenditure",
        ];
        var expenditureTypeIndex = $(this).val();
        if (expenditureType[expenditureTypeIndex] == "Capital Expenditure") {
            $("#purposeType").empty();
            $("#purposeType").append(`<option value="">Select</option>
    <option value="Maintain current levels of operation within the organization">Maintain current levels of operation within the organization</option>
        <option value="Expenses to permit future expansion">Expenses to permit future expansion</option>`);
        } else if (expenditureType[expenditureTypeIndex] == "Revenue Expenditure") {
            $("#purposeType").empty();
            $("#purposeType").append(`<option value="">Select</option>
    <option value=" Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services"> Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services</option>
        <option value="All expenses incurred by the firm to guarantee the smooth operation">All expenses incurred by the firm to guarantee the smooth operation</option>`);
        } else if (
            expenditureType[expenditureTypeIndex] == "Deferred Revenue Expenditure"
        ) {
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

    function convertToWords(amount) {
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

        function convertGroup(number) {
            if (number === 0) return "";
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
        var words = "";
        var crores = Math.floor(amount / 10000000);
        var lakhs = Math.floor((amount % 10000000) / 100000);
        var thousands = Math.floor((amount % 100000) / 1000);
        var remaining = Math.round(amount % 1000);

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

    $("#partyAmount").change(function () {
        var partyAmount = $(this).val();
        partyAmount = parseInt(partyAmount);
        var words = convertToWords(partyAmount);
        $(this).val(words);
    });
    $("#searchButton").click(function () {
        var bankIFSCCode = $("#bankIFSCCode").val();
        var ifscCodeError = "";
        if (bankIFSCCode.length != 11) {
            $("#bankIFSCCodeError").empty();
            $("#bankIFSCCodeError").append(`<p>IFSC code must be 11 characters.</p>`);
        } else if (bankIFSCCode.length == 11) {
            $("#bankIFSCCodeError").empty();
            if (bankIFSCCode.slice(0, 4).match(/[^A-Z]/g)?.length > 0) {
                ifscCodeError += `<p>First four characters must be capital.</p>`;
            }
            if (bankIFSCCode[4] != "0") {
                ifscCodeError += `<p>Fifth character must be zero.</p>`;
            }
            if (bankIFSCCode.slice(5, 11).match(/[^0-9a-z]/gi)?.length > 0) {
                ifscCodeError += `<p>Last six characters must be alpha-numerical</p>`;
            }
            if (ifscCodeError.length != 0) {
                $("#bankIFSCCodeError").empty();
                $("#bankIFSCCodeError").append(ifscCodeError);
            } else {
                var url = "https://ifsc.razorpay.com/" + bankIFSCCode;
                $.get(url, function (data, status) {
                    if (status === "success") {
                        const { BANK, BRANCH } = data;
                        $("#bankName").text(`${BANK}`);
                        $("#bankBranch").text(`${BRANCH}`);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    $("#bankIFSCCodeError").empty();
                    $("#bankIFSCCodeError").append(
                        `<p>${textStatus} : ${errorThrown}</p>`
                    );
                    $("#bankName").text("XXXXX");
                    $("#bankBranch").text("XXXXX");
                });
            }
        }
    });
    var documents = [];
    var fileId = 0;
    $("#addButton").click(function () {
        var uploadDocument = $("#uploadDocument")
            .val()
            .slice(12, $("#uploadDocument").val().length);
        var alreadyExist = 0;
        if (uploadDocument.length == 0) {
            $("#uploadDocumentsError").empty();
            $("#uploadDocumentsError").append(`<p>Please upload document</p>`);
        } else {
            for (i of documents) {
                if (i == uploadDocument) {
                    $("#uploadDocumentsError").empty();
                    $("#uploadDocumentsError").append(`<p>Document already uploaded</p>`);
                    setTimeout(() => {
                        $("#uploadDocumentsError").empty();
                    }, 4000);
                    $("#uploadDocument").val("");
                    alreadyExist = 1;
                }
            }
            if (alreadyExist == 0) {
                $("#uploadDocumentsError").empty();
                fileId++;
                documents.push(uploadDocument);
                $("#folder").append(
                    `<div class="mb-2 bg-success bg-opacity-10 text-success d-flex justify-content-between" id="` +
                    "file" +
                    fileId +
                    `"><div class="m-2">` +
                    uploadDocument +
                    `</div>
                    <div class="btn border-0" id="` +
                    "file" +
                    fileId +
                    "Button" +
                    `">X</div>`
                );
                $("#uploadDocument").val("");
                $("#" + "file" + fileId + "Button").click(function () {
                    documents.splice(documents.indexOf(uploadDocument), 1);
                    var elementId = $(this).attr("id");
                    $("#" + elementId.slice(0, elementId.length - 6)).attr(
                        "class",
                        "d-none"
                    );
                });
            }
        }
    });

    $("#partyAccountNo").on("input", function () {
        var inputVal = $(this).val();
        var numericVal = inputVal.replace(/[^0-9]/g, "");
        $(this).val(numericVal);
    });
    $("#partyAmount").on("input", function () {
        var inputVal = $(this).val();
        var numericVal = inputVal.replace(/[^0-9]/g, "");
        $(this).val(numericVal);
    });
    $("#nextButton").click(function () {
        var accountFormObj = {
            partyAccountNo: $("#partyAccountNo").val().trim(),
            confirmAccountNo: $("#confirmAccountNo").val(),
            partyName: $("#partyName").val(),
            bankIFSCCode: $("#bankIFSCCode").val(),
            headOfAccount: $("#headOfAccount").val(),
            expenditureType: $("#expenditureType").val(),
            purposeType: $("#purposeType").val(),
            purpose: $("#purpose").val(),
            partyAmount: $("#partyAmount").val(),
            documentname: $("#uploadDocument").val(),
        };
        var transactionType = [
            "",
            "Single party",
            "Multiple parties",
            "PD Account to PD Account",
            "PD Account to Other",
        ];
        if ($('input[name="transactionType"]:checked').length == 0) {
            $("#transactionTypeError").empty();
            $("#transactionTypeError").append(
                `<p>Please select Transaction Type</p>`
            );
        } else {
            $("#transactionTypeError").empty();
        }
        if (accountFormObj.partyAccountNo.length < 12) {
            $("#partyAccountnoError").empty();
            $("#partyAccountnoError").append(
                `<p>Account number should be min of 12 characters.</p>`
            );
        } else if (accountFormObj.partyAccountNo.length > 22) {
            $("#partyAccountnoError").empty();
            $("#partyAccountnoError").append(
                `<p>Account number should be max of 22 characters</p>`
            );
        } else {
            $("#partyAccountnoError").empty();
        }
        if (accountFormObj.confirmAccountNo.length == 0) {
            $("#confirmAccountnoError").empty();
            $("#confirmAccountnoError").append(
                `<p>Confirm account number shouldn't be empty</p>`
            );
        } else if (
            accountFormObj.partyAccountNo !== accountFormObj.confirmAccountNo
        ) {
            $("#confirmAccountnoError").empty();
            $("#confirmAccountnoError").append(
                `<p>Doesn't matches with Account number</p>`
            );
        } else {
            $("#confirmAccountnoError").empty();
        }
        if (accountFormObj.partyName.length == 0) {
            $("#partyNameError").empty();
            $("#partyNameError").append(`<p>Party name should not be empty</p>`);
        } else if (
            accountFormObj.partyName.match(/[^a-z]&&[^0-9]/gi)?.length == 1
        ) {
            $("#partyNameError").empty();
            $("#partyNameError").append(`<p>Don't include special characters</p>`);
        } else {
            $("#partyNameError").empty();
        }
        var ifscCodeError = "";
        if (accountFormObj.bankIFSCCode.length == 0) {
            $("#bankIFSCCodeError").empty();
            $("#bankIFSCCodeError").append(`<p>IFSC Code should not be empty</p>`);
        } else if (accountFormObj.bankIFSCCode.length != 11) {
            $("#bankIFSCCodeError").empty();
            $("#bankIFSCCodeError").append(`<p>IFSC code must be 11 characters.</p>`);
        } else if (accountFormObj.bankIFSCCode.length == 11) {
            if (
                accountFormObj.bankIFSCCode.slice(0, 4).match(/[^A-Z]/g)?.length == 1
            ) {
                ifscCodeError += `<p>First four characters must be capital.</p>`;
            }
            if (accountFormObj.bankIFSCCode[4] != "0") {
                ifscCodeError += `<p>Fifth character must be zero.</p>`;
            }
            if (
                accountFormObj.bankIFSCCode.slice(5, 11).match(/[^0-9a-z]/gi)?.length ==
                1
            ) {
                ifscCodeError += `<p>Last six characters must be alpha-numerical</p>`;
            }
            if (ifscCodeError.length != 0) {
                $("#bankIFSCCodeError").empty();
                $("#bankIFSCCodeError").append(ifscCodeError);
            } else {
                $("#bankIFSCCodeError").empty();
            }
        }
        if (accountFormObj.headOfAccount.length == 0) {
            $("#headOfAccountError").empty();
            $("#headOfAccountError").append(`<p>Please select head of account</p>`);
        } else {
            $("#headOfAccountError").empty();
        }
        if (accountFormObj.expenditureType.length == 0) {
            $("#expenditureTypeError").empty();
            $("#expenditureTypeError").append(
                `<p>Please select Expenditure Type</p>`
            );
        } else {
            $("#expenditureTypeError").empty();
        }
        if (accountFormObj.purposeType.length == 0) {
            $("#purposeTypeError").empty();
            $("#purposeTypeError").append(`<p>Please select purpose type.</p>`);
        } else {
            $("#purposeTypeError").empty();
        }
        if (accountFormObj.purpose.length == 0) {
            $("#purposeError").empty();
            $("#purposeError").append(`<p>Purpose should not be empty.</P>`);
        } else if (accountFormObj.purpose.length > 500) {
            $("#purposeError").empty();
            $("#purposeError").append(
                `<p>Characters should not be more than 500.</P>`
            );
        } else {
            $("#purposeError").empty();
        }
        if (accountFormObj.partyAmount.length == 0) {
            $("#partyAmountError").empty();
            $("#partyAmountError").append(`<p>Party amount shouldn't be empty</p>`);
        } else {
            $("#partyAmountError").empty();
        }
        if (documents.length == 0) {
            $("#uploadDocumentsError").empty();
            $("#uploadDocumentsError").append(`<p>Select atleast one file</p>`);
        } else {
            $("#uploadDocumentsError").empty();
        }
    });
});
