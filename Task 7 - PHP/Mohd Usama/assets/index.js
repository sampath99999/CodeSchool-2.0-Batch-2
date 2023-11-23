const sideBarList = [
  "Home",
  "Employee Masters",
  "Transactions",
  "Reports",
  "Return Cheque Generation",
  "Forest Transactions",
  "Forest Transaction Report",
  "E-Kuber Return Received List",
  "E-Kuber Return Challan Print",
  "UTR Search",
  "Failed transactions (ACK Reject)",
  "Check Status Report",
  "Rejected Cheques due to FinYear End",
  "FinYear New Cheque Report",
  "Pb Budget Check",
  "Update Receipts Used Amount",
];

const overlay = $("<div>", {
  id: "overlay",
  class: "overlay",
});

const points = [
  "Please note that all cheques which are approved from DDOChecCKer/Ohicer/Govt trom 01/03/2019 shall get paid through Ekuber which iIS a Core Banking Solution ot RBI.",
  "There is no need to present the cheques at the Bank for these cheques which got approved after 01/03/2019.",
  "Please give correct account details as it is when the Account was opened.",
  "Make sure there is no 'Your self' or 'Self' in the account names while issuing cheques. Such cheques get auto-rejected by the EKuber",
  "Please check the exact length of the Bank Account Number and NO special characters are to be entered, which leads to auto rejection",
  "Finally, in multiple party cheques please do not enter the same party details in the same chequeno which will be considered as a duplicacy transaction and gets auto-rejeted.",
  "This is just a one-time procedure to get your Party details corrected and once when corrected the same details can be re-used for smooth transactions.",
  "PD-to-PD cheques shall be adjusted in treasury itself in the regular procedure.",
];

const bankBranches2 = {
  SBIN0001234: ["State Bank of India", "Mumbai Main Branch"],
  ICIC0005678: ["ICICI Bank", "Chennai Mount Road Branch"],
  HDFC0009876: ["HDFC Bank", "New Delhi Connaught Place Branch"],
  UTIB0004321: ["Axis Bank", "Bengaluru MG Road Branch"],
  PNBK0012345: ["Punjab National Bank", "Kolkata Esplanade Branch"],
  BARB0098765: ["Bank of Baroda", "Ahmedabad CG Road Branch"],
  CNRB0087654: ["Canara Bank", "Hyderabad Begumpet Branch"],
  INDB0076543: ["IndusInd Bank", "Pune FC Road Branch"],
  KKBK0065432: ["Kotak Mahindra Bank", "Jaipur C Scheme Branch"],
  UBIN0054321: ["Union Bank of India", "Lucknow Hazratganj Branch"],
};

const HOA = {
  "0853001020002000000NVN": [1000000, 5000],
  "8342001170004001000NVN": [1008340, 4000],
  "2071011170004320000NVN": [14530000, 78000],
  "8342001170004002000NVN": [1056400, 34000],
  "2204000030006300303NVN": [123465400, 5000],
};

const ExpenditureAndPurpose = {
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
    "Development and Research Cost",
  ],
};
let radioVal = "";
$(document).ready(function () {
  generatePage();
});

function toggleImages() {
  var windowWidth = $(window).width();
  if (windowWidth < 576) {
    $(".logo").show();
  } else {
    $(".logo").hide();
  }
}

toggleImages();
$(window).resize(function () {
  toggleImages();
});
function generatePage() {
  let container = createContainerFluid("main-container");
  let row = createRow("main-row");
  let leftCol = createCol("left-col", "2 col-6 d-none");
  let rightCol = createCol("right-col", "12");
  let sideBar = createSideBar();
  let mainContent = createMainContent();
  leftCol.append(sideBar);
  rightCol.append(mainContent);
  row.append(leftCol, rightCol);
  container.append(row);
  $("body").append(container);
  $("body").append(overlay);
  overlay.hide();
}

function createMainContent() {
  let mainContent = createRow();
  let mainContentHeader = createMainContentHeader();
  let mainContentBody = createMainContentBody();
  mainContent.append(mainContentHeader, mainContentBody);
  return mainContent;
}

function createMainContentBody() {
  let col = createCol("", "12");
  let mainContentBody = createRow();
  col.append(mainContentBody);
  let mainContentBodyInfo = createMainContentBodyInfo();
  let mainContentBodyPoints = createMainContentBodyPoints();
  let mainContentBodyContent = createMainContentBodyInputs();
  mainContentBody.append(
    mainContentBodyInfo,
    mainContentBodyPoints,
    mainContentBodyContent
  );
  return col;
}

function createMainContentBodyInputs() {
  let col = createCol(
    "content-inputs",
    "12 d-flex flex-column p-2 justify-content-left m-auto mt-4"
  );
  form = createForm();
  col.append(form);
  return col;
}
function createStaticFormField(labelText, elementId, defaultText) {
  const label = createFormFieldLabel(`${elementId}Label`, labelText, false);
  const name = $("<span>", {
    class: "fw-bold py-2",
    id: elementId,
    text: defaultText,
  });

  const group = $("<div>").addClass("input-group d-flex mb-1");
  group.append(label, name);
  return group;
}

function createForm() {
  const form = $("<form>").addClass("my-form mx-4 mx-sm-0");

  const fields = [
    {
      label: "Transaction Type",
      type: "radio",
      name: "transaction-type",
      options: [
        "Single Party",
        "Multiple Parties",
        "PD Account to PD Account",
        "PD Account to other",
      ],
    },
    {
      label: "Party Account no",
      type: "password",
      id: "partyACField",
      placeholder: "Enter A/C no",
    },
    {
      label: "Confirm Party Account no",
      type: "number",
      id: "confirmPartyACField",
      placeholder: "Confirm A/C no",
    },
    {
      label: "Party Name",
      type: "text",
      id: "partyNameField",
      placeholder: "Enter Party Name",
      pattern: "[A-Za-z0-9s]*",
    },
  ];

  fields.forEach(function (fieldData) {
    const field = createFormField(fieldData);
    form.append(field);
  });
  let bankIfsc = createBankIfscField();
  let bankName = createStaticFormField("Bank Name", "bankName", "XXXXXX");
  let bankBranch = createStaticFormField("Bank Branch", "bankBranch", "XXXXXX");
  let headOfAC = createHeadofAC();
  let balance = createStaticFormField("Balance", "bankBalance", "XXXXXX");
  let loc = createStaticFormField("LOC", "loc", "XXXXXX");
  let expenditureType = createExpenditureType();
  let purposeType = createPurposeType();
  let purpose = createPurpose();
  let partyAmount = createPartyAmount();
  let partyAmountInWords = createPartyAmountInWords();
  let uploadDocs = createUploadDocs();
  let rightArrow = createLogos("fa-solid fa-caret-right");
  let container = createContainerFluid();
  container.addClass(
    " p-0 m-0 d-flex flex-column justify-content-center align-items-center"
  );
  let hr = $("<hr>");
  const submitButton = $("<button>", {
    type: "submit",
    class: "btn btn-primary",
    text: `Next`,
  });
  $(submitButton).click(function (e) {
    e.preventDefault();
    accountNumber = $("#partyACField").val();
    confirmAccountNumber = $("#confirmPartyACField").val();
    partyname = $("#partyNameField").val();
    bankifsc = $("#bankIfscCodeField").val();
    purposeDetails = $("#purposeField").val();
    transactionTypeCheck();
    validatePartyAccountNumber(accountNumber);
    validateConfirmPartyAccountNumber(confirmAccountNumber, accountNumber);
    validatePartyName(partyname);
    validateIfscCode(bankifsc, false);
    validatePurpose(purposeDetails);
    validateSelectField(
      $("#HOAField").val(),
      "Head of Account",
      "#HOAFieldError"
    );
    validateSelectField(
      $("#expenditureTypeField").val(),
      "Expenditure Type",
      "#expenditureTypeFieldError"
    );
    validateSelectField(
      $("#purposeTypeField").val(),
      "Purpose Type",
      "#purposeTypeFieldError"
    );
  });
  submitButton.append(rightArrow);
  container.append(submitButton);
  form.append(
    bankIfsc,
    bankName,
    bankBranch,
    headOfAC,
    balance,
    loc,
    expenditureType,
    purposeType,
    purpose,
    partyAmount,
    partyAmountInWords,
    uploadDocs,
    hr,
    container
  );
  return form;
}

function validateSelectField(fieldValue, fieldName, id) {
  error = [];
  if (!fieldValue || fieldValue === "default") {
    error.push(`Please select a valid option for ${fieldName}.`);
  }
  showError(id, error);
}

function validatePurpose(purposeText) {
  error = [];
  if (purposeText.length < 1) {
    error.push("Purpose is Required");
    error.push("Purpose should be maximum 500 characters.");
  }

  if (purposeText.length > 500) {
    error.push("Purpose should be maximum 500 characters.");
  }
  showError("#purposeFieldError", error);
}

function validateIfscCode(code, btn) {
  error = [];
  if (code.length < 1) {
    error.push("IFSC Code is Required");
  }
  if (code.length !== 11) {
    error.push("IFSC Code should be 11 characters long.");
  }
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(code)) {
    error.push("Invalid IFSC Code format.");
  }
  if (error.length == 0 && btn == true) {
    showError("#bankIfscCodeFieldError", error);
    return true;
  }
  const ifsc = getRandomNumber(0, 9);
  const keys = Object.keys(bankBranches2);
  const ifscCode = keys[ifsc];
  const bank = bankBranches2[ifscCode][0];
  const branch = bankBranches2[ifscCode][1];
  error.push(`Try this ${ifscCode} for ${bank} and it's ${branch}`);
  showError("#bankIfscCodeFieldError", error);
}

function validatePartyName(name) {
  error = [];
  if (name.length < 1) {
    error.push("Party Name is Required");
    error.push("Party Name should not have special characters.");
  }
  if (!/^[a-zA-Z0-9]*$/.test(name)) {
    error.pushX("Party Name should not have special characters.");
  }
  showError("#partyNameFieldError", error);
}

function validateConfirmPartyAccountNumber(confirmNumber, accountNumber) {
  error = [];
  if (confirmNumber.length < 1) {
    error.push("Confirm Party Account number is Required");
  }
  if (confirmNumber !== accountNumber) {
    error.push(
      "Confirm Party Account number should match Party Account number."
    );
  }
  showError("#confirmPartyACFieldError", error);
}

function validatePartyAccountNumber(accountNumber) {
  error = [];
  if (accountNumber.length < 12 || accountNumber.length > 22) {
    error.push("Party Account number should be between 12 and 22 digits.");
  }
  if (!/^[0-9]*$/.test(accountNumber)) {
    error.push("Party Account number should be number.");
  }
  showError("#partyACFieldError", error);
}

function transactionTypeCheck() {
  error = [];
  if (radioVal == "") {
    error.push("Select a Transaction Type");
  }
  showError("#transactionError", error);
  return;
}

function createFormFieldLabel(id, text, required) {
  const label = $("<label>", {
    for: id,
    class: "col-form-label col-md-3 col-12 fw-bold",
    text: text,
  });
  if (required) {
    req = $("<span>", {
      class: "text-danger",
      text: "*",
    });
    label.append(req);
    return label;
  }
  return label;
}

function createFormFieldInput(type, id, placeholder, pattern) {
  const input = $("<input>", {
    type: type,
    id: id,
    placeholder: placeholder,
    pattern: pattern,
    class: "form-control text-input-width",
    required: true,
  });
  $(input).on("keydown", function (event) {
    const pressedKey = event.key;
    inp = $(this).val();
    if (pressedKey === ".") {
      event.preventDefault();
    }
  });
  return input;
}

function createFormField(fieldData) {
  const fieldWrapper = $("<div>").addClass("d-md-flex d-block my-2");
  if (
    fieldData.type === "text" ||
    fieldData.type === "number" ||
    fieldData.type === "password"
  ) {
    label = createFormFieldLabel("", fieldData.label, true);
    input = createFormFieldInput(
      fieldData.type,
      fieldData.id,
      fieldData.placeholder,
      fieldData.pattern ? fieldData.pattern : ""
    );
    const errorDiv = createContainerFluidFlex(`${fieldData.id}Error`);
    const container = createContainerFluidFlex(`${fieldData.id}Container`);
    container.addClass("");
    container.append(input);
    container.append(errorDiv);
    fieldWrapper.append(label, container);
  } else if (fieldData.type === "radio") {
    const label = createFormFieldLabel(
      "transaction-type",
      fieldData.label,
      true
    );

    const container = createContainerFluidFlex("transactionContainer");
    const errorDiv = createContainerFluidFlex("transactionError");
    const radioWrapper = $("<div>", {
      id: "transactionType",
    }).addClass("form-check d-flex flex-wrap gap-3 py-2 ps-1 ");

    fieldData.options.forEach(function (option) {
      const radioLabel = $("<label>", {
        class: "form-check-label",
        text: option,
      });

      const radioInput = $("<input>", {
        type: "radio",
        name: fieldData.name,
        value: option,
        class: "form-check-input small",
        required: true,
      });
      $(radioInput).on("change", function () {
        const selectedValue = $(this).val();
        radioVal = selectedValue;
      });
      const radioDiv = $("<div>").addClass("form-check ");

      radioDiv.append(radioInput, radioLabel);
      radioWrapper.append(radioDiv);
      container.append(radioWrapper, errorDiv);
    });

    fieldWrapper.append(label, container);
  }

  return fieldWrapper;
}

function createUploadDocs() {
  const uploadDocsLabel = $("<label>", {
    for: "uploadDocs",
    class: "col-form-label fw-bold col-md-3 col-12",
    text: "Upload Documents",
  });

  const container = $("<div>").addClass("w-50 d-flex flex-column");
  const uploadDocsInput = $("<input>", {
    type: "file",
    class: "form-control",
    id: "uploadDocs",
    name: "files[]",
  });

  const note = $("<span>", {
    class: "p-2 fst-italic",
    text: "Note: Documents of Cheque (Letter/G.O. etc) can be uploaded here",
  });

  const selectedFilesList = $("<ul>", {
    id: "selectedFilesList",
    class: "list-unstyled",
  });
  container.append(uploadDocsInput, selectedFilesList, note);

  let selectedFiles = new Set();

  const uploadDocsButton = $("<button>", {
    type: "button",
    class: "btn btn-primary mx-3 rounded-3",
    id: "uploadDocsButton",
    text: "+ Add",
    style: "max-height: 40px",
  });

  let file;
  uploadDocsButton.click(function () {
    if (file) {
      if (!selectedFiles.has(file.name)) {
        selectedFiles.add(file.name);

        const listItem = $("<li>").addClass(
          "d-flex justify-content-between align-items-center"
        );

        const filenameSpan = $("<span>").text(file.name);

        const closeButton = $("<span class='close-button btn'>&times;</span>");
        closeButton.click(function () {
          selectedFiles.delete(file.name);
          listItem.remove();
        });

        listItem.append(filenameSpan, closeButton);
        $("#selectedFilesList").append(listItem);
      }
    }
  });

  uploadDocsInput.change(function (event) {
    file = event.target.files[0];
  });

  const uploadDocsGroup = $("<div>").addClass("input-group d-flex mb-3");
  uploadDocsGroup.append(uploadDocsLabel, container, uploadDocsButton);

  return uploadDocsGroup;
}

function createPartyAmountInWords() {
  const partyAmountInWordsLabel = $("<label>", {
    for: "partyAmountInWords",
    class: "col-form-label fw-bold col-md-3 col-12",
    text: "Party Amount in Words",
  });

  const partyAmountInWordsInput = $("<input>", {
    type: "text",
    id: "partyAmountInWords",
    class: "form-control input-width",
    placeholder: "Enter Party Amount in Words",
  });

  const partyAmountInWordsGroup = $("<div>").addClass(
    "form-group row d-flex mb-2"
  );
  partyAmountInWordsGroup.append(
    partyAmountInWordsLabel,
    partyAmountInWordsInput
  );
  return partyAmountInWordsGroup;
}

function createPartyAmount() {
  const partyAmountLabel = $("<label>", {
    for: "partyAmount",
    class: "col-form-label fw-bold col-md-3 col-12",
    text: "Party Amount",
  });

  const partyAmountInput = $("<input>", {
    type: "number",
    id: "partyAmount",
    class: "form-control input-width",
    placeholder: "Enter Party Amount",
  });

  $(partyAmountInput).on("keydown", function (event) {
    const pressedKey = event.key;
    if (pressedKey === ".") {
      event.preventDefault();
    }
  });
  $(partyAmountInput).on("keyup", function (event) {
    const inputValue = $(this).val();
    const words = convertToWords(inputValue);
    $("#partyAmountInWords").val(`${words} Rupees Only`);
  });
  const partyAmountGroup = $("<div>").addClass("form-group row d-flex mb-2");
  partyAmountGroup.append(partyAmountLabel, partyAmountInput);
  return partyAmountGroup;
}

function createPurpose() {
  const purposeLabel = $("<label>", {
    for: "purposeField",
    class: "col-form-label fw-bold col-3",
    text: "Purpose",
  });
  const req = $("<span>", {
    class: "text-danger",
    text: "*",
  });
  purposeLabel.append(req);
  const container = createContainerFluidFlex("purposeFieldContainer");
  const errorDiv = createContainerFluidFlex("purposeFieldError");
  container.addClass("input-width");

  const Purpose = $("<textarea>", {
    id: "purposeField",
    class: "form-control",
    rows: "2",
    maxlength: "500",
    placeholder: "Purpose",
    required: true,
  });

  container.append(Purpose, errorDiv);
  const purposeGroup = $("<div>").addClass("input-group d-flex mb-2");
  purposeGroup.append(purposeLabel, container);
  return purposeGroup;
}

function createExpenditureType() {
  const selectLabel = $("<label>", {
    for: "expenditureTypeField",
    class: "col-form-label col-md-3 col-12 fw-bold",
    text: "Expenditure Type",
  });
  const req = $("<span>", {
    class: "text-danger",
    text: "*",
  });
  selectLabel.append(req);
  const selectInput = $("<select>", {
    id: "expenditureTypeField",
    class: "form-control",
    required: true,
  });
  const container = createContainerFluidFlex();
  const errorDiv = createContainerFluidFlex(`expenditureTypeFieldError`);
  container.addClass("input-width");
  container.append(selectInput, errorDiv);
  const defaultOption = $("<option>", {
    value: "",
    text: "Select",
    disabled: true,
    selected: true,
    hidden: true,
  });
  selectInput.append(defaultOption);

  const options = [...Object.keys(ExpenditureAndPurpose)];
  options.forEach(function (option) {
    const optionElement = $("<option>", {
      value: option,
      text: option,
    });
    selectInput.append(optionElement);
  });
  selectInput.click(function () {
    $(this).find("option:not(:selected)").show();
    const expenditure = $(this).val();
    if (expenditure == null) {
      return;
    }
    expVal = expenditure;
    const purposeTypeOptions = Object.values(
      ExpenditureAndPurpose[expenditure]
    );
    const purposeTypeDefaultOption = $("<option>", {
      value: "",
      text: "Select",
      disabled: true,
      selected: true,
      hidden: true,
    });
    const purposeTypeSelectInput = $("#purposeTypeField");
    purposeTypeSelectInput.empty();
    purposeTypeSelectInput.append(purposeTypeDefaultOption);
    purposeTypeOptions.forEach(function (option) {
      const purposeTypeOptionElement = $("<option>", {
        value: option,
        text: option,
      });
      purposeTypeSelectInput.append(purposeTypeOptionElement);
    });
    purposeTypeSelectInput.click(function () {
      $(this).find("option:not(:selected)").show();
      const pval = $(this).val();
      if (pval == null) {
        return;
      }
      purposeVal = pval;
    });
  });
  const selectGroup = $("<div>").addClass("input-group d-flex mb-2");
  selectGroup.append(selectLabel, container);
  return selectGroup;
}

function createPurposeType() {
  const selectLabel = $("<label>", {
    for: "purposeTypeField",
    class: "col-form-label col-md-3 col-12 fw-bold",
    text: "Purpose Type",
  });
  const req = $("<span>", {
    class: "text-danger",
    text: "*",
  });
  selectLabel.append(req);
  const selectInput = $("<select>", {
    id: "purposeTypeField",
    class: "form-control",
    required: true,
  });
  const container = createContainerFluidFlex();
  const errorDiv = createContainerFluidFlex(`purposeTypeFieldError`);
  container.addClass("input-width");
  container.append(selectInput, errorDiv);
  const defaultOption = $("<option>", {
    value: "",
    text: "Select",
    disabled: true,
    selected: true,
    hidden: true,
  });
  selectInput.append(defaultOption);
  const selectGroup = $("<div>").addClass("input-group d-flex mb-2");
  selectGroup.append(selectLabel, container);
  return selectGroup;
}

function createHeadofAC() {
  const selectLabel = $("<label>", {
    for: "HOAField",
    class: "col-form-label col-md-3 fw-bold",
    text: "Head of account",
  });
  const req = $("<span>", {
    class: "text-danger",
    text: "*",
  });
  selectLabel.append(req);
  const container = createContainerFluidFlex();
  const errorDiv = createContainerFluidFlex(`HOAFieldError`);
  const selectInput = $("<select>", {
    id: "HOAField",
    class: "form-control",
    required: true,
  });
  container.addClass("input-width");
  const defaultOption = $("<option>", {
    value: "",
    text: "Select",
    disabled: true,
    selected: true,
    hidden: true,
  });
  container.append(selectInput, errorDiv);
  selectInput.append(defaultOption);

  const options = [...Object.keys(HOA)];
  options.forEach(function (option) {
    const optionElement = $("<option>", {
      value: option,
      text: option,
    });
    selectInput.append(optionElement);
  });
  selectInput.click(function () {
    $(this).find("option:not(:selected)").show();
    const hoa = $(this).val();
    if (hoa == null) {
      return;
    }
    hoaVal = hoa;
    const hoaValues = Object.values(HOA[hoa]);
    const bankBalance = $("#bankBalance");
    const loc = $("#loc");
    bankBalance.text(hoaValues[0]);
    loc.text(hoaValues[1]);
  });

  const selectGroup = $("<div>").addClass("input-group d-flex mb-2");
  selectGroup.append(selectLabel, container);
  return selectGroup;
}

function createBankIfscField() {
  const errorDiv = createContainerFluidFlex(`bankIfscCodeFieldError`);
  const container = createContainerFluidFlex(`bankIfscCodeFieldContainer`);
  container.addClass(" input-width");

  const bankIfscFiledLabel = $("<label>", {
    for: "bankIfscCodeField",
    class: "col-form-label col-md-3 fw-bold",
    text: "Bank IFSC Code",
  });
  const req = $("<span>", {
    class: "text-danger",
    text: "*",
  });
  bankIfscFiledLabel.append(req);
  const bankIfscFiledInput = $("<input>", {
    type: "text",
    id: "bankIfscCodeField",
    class: "form-control ",
    placeholder: "Enter IFSC Code",
    minlength: "11",
    maxlength: "11",
    pattern: "[A-Z]{4}0[A-Za-z0-9]{6}",
    required: true,
  });
  const bankIfscFiledButton = $("<button>", {
    type: "button",
    class: "btn btn-primary mx-3 rounded-3",
    id: "bankIfscCodeButton",
    text: "Search",
  });
  inputContainer = createContainerFluid();
  inputContainer.addClass("p-0 d-flex");
  inputContainer.append(bankIfscFiledInput, bankIfscFiledButton);

  container.append(inputContainer, errorDiv);
  bankIfscFiledButton.click(function () {
    const input = bankIfscFiledInput.val();
    const bankName = $("#bankName");
    const bankBranch = $("#bankBranch");
    let check = false;
    if (validateIfscCode(input, true)) {
      const ifscCodes = Object.keys(bankBranches2);

      ifscCodes.forEach(function (code) {
        if (code == input) {
          bankName.text(bankBranches2[code][0]);
          bankBranch.text(bankBranches2[code][1]);
          check = true;
        }
      });
    }
    if (!check) {
      bankName.text("XXXXXX");
      bankBranch.text("XXXXXX");
    }
  });
  const bankIfscFiledGroup = $("<div>").addClass("input-group d-flex mb-3");
  bankIfscFiledGroup.append(bankIfscFiledLabel, container);
  return bankIfscFiledGroup;
}

function createMainContentBodyPoints() {
  let col = createCol(
    "content-points",
    "12 d-flex flex-column bg-warning-subtle p-2 justify-content-left m-auto mb-1"
  );
  let heading = $("<h6>", {
    class: "fw-bold mt-1 ms-1",
    text: "Points to remember",
  });
  list = $("<ul>", {
    class: "",
  });
  for (i in points) {
    let point = createPointsItem(points[i]);
    list.append(point);
  }
  col.append(heading, list);
  return col;
}

function createPointsItem(item) {
  const li = $("<li>", {
    class: "px-2 py-1 small-f",
    text: item,
  });
  return li;
}

function createMainContentBodyInfo() {
  let col = createCol(
    "content-info",
    "12 d-sm-flex d-none bg-info-subtle p-2 m-3 justify-content-left align-items-center "
  );
  let logo = createLogos("fa-solid fa-money-check-dollar py-2 text-primary");
  let infoText = $("<span>", {
    class: "text-primary fw-bold p-2",
    text: "Issue Cheque (E-Kuber Cheque From 01/03/2019)",
  });
  col.append(logo, infoText);
  return col;
}

function createMainContentHeader() {
  let col = createCol("", "12");
  let row = createRow();
  row.addClass("main-content-header-row");
  col.append(row);
  let leftMainContentHeader = createLeftMainContentHeader();
  let rightMainContentHeader = createRightMainContentHeader();
  row.append(leftMainContentHeader, rightMainContentHeader);
  return col;
}

function createRightMainContentHeader() {
  let isLoggedIn = true;
  let logText = isLoggedIn ? "Logout" : "Login";
  let dropdown = createUserDropDown();
  let col = createCol(
    "left-main-content-header",
    "8 col-8 d-flex justify-content-end align-items-center gap-3"
  );
  let logBtn = createNavBtn(
    "log-btn",
    "",
    [],
    "fa-solid fa-arrow-right-from-bracket",
    "d-sm-flex d-none"
  );
  let profile = createNavBtn(
    "profile-btn",
    "d-sm-flex d-none",
    ["Welcome M.USHASHREE", "(23031013097)"],
    "fa-user rounded-circle border p-2"
  );
  let lastLogin = createLastLogin();
  profile.append(dropdown);
  let logSpan = $("<span>", {
    class: "text-white",
    text: logText,
  });
  logBtn.append(logSpan);
  col.append(lastLogin, profile, logBtn);
  logBtn.click(function () {
    isLoggedIn = !isLoggedIn;
    logText = isLoggedIn ? "Logout" : "Login";
    logSpan.text(logText);
  });
  return col;
}

function createUserDropDown() {
  var dropdown = $("<div>", {
    class: "dropdown",
    id: "logoDropdown",
    html: $("<button>", {
      class: "btn modules-div text-white dropdown-toggle",
      type: "button",
      id: "dropdownMenuButton",
      "data-bs-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
    }),
  });

  var dropdownMenu = $("<div>", {
    class: "dropdown-menu",
    "aria-labelledby": "dropdownMenuButton",
  });

  var dropdownItems = [
    "Profile",
    "Account Settings",
    "Privacy Settings",
    "Notifications",
  ];

  for (var i = 0; i < dropdownItems.length; i++) {
    var dropdownItem = $("<a>", {
      class: "dropdown-item",
      href: "#",
      text: dropdownItems[i],
    });
    dropdownMenu.append(dropdownItem);
  }

  dropdown.append(dropdownMenu);
  return dropdown;
}

function createLastLogin() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  const t = d.getHours() + ":" + d.getMinutes() + " PM";
  const div = $("<div>", {
    class: `last-login d-md-flex d-none flex-column align-items-end p-2 small-f `,
  });
  const text = $("<p>", {
    class: "text-secondary p-0 m-0",
    text: "Last Login",
  });
  const date = $("<p>", {
    class: "text-white p-0 m-0",
    text: `${day}-${month}-${year}`,
  });
  const time = $("<p>", {
    class: "text-white p-0 m-0",
    text: t,
  });
  div.append(text, date, time);
  return div;
}

function createLogos(logo) {
  return $("<i>", {
    class: `${logo} px-2`,
  });
}

function createLeftMainContentHeader() {
  let col = createCol(
    "left-main-content-header",
    "4 col-4 d-flex justify-content-start align-items-center gap-3"
  );
  let logo = createImg();
  let menu = createBarsIcon();
  let modules = createNavBtn("modules-btn", "", ["Modules"], "fa-cubes");
  col.append(logo, menu, modules);
  return col;
}

function createImg() {
  return $("<img>", {
    src: "images/mobile-logo.png",
    alt: "logo",
    class: "logo d-block d-sm-none img-fluid my-auto",
    style: "max-height:70%",
  });
}

function createNavBtn(id, textClass, text, fa, classes) {
  const div = $("<div>", {
    class: `modules-div d-flex align-items-center p-2 rounded modules-div ${classes}`,
    id: id,
    style: "max-height:70%",
  });

  const icon = $("<i>", {
    class: `fa-solid ${fa} me-3 text-white`,
    "aria-hidden": "true",
  });

  const textElement = $("<div>", {
    class: `d-flex flex-column text-white justify-content-center align-items-center ${textClass}`,
  });
  for (i in text) {
    textElement.append(
      $("<p>", {
        class: "my-auto small-f",
        text: text[i],
      })
    );
  }
  div.append(icon, textElement);
  return div;
}

function createBarsIcon() {
  const bars = $("<i>", {
    class: "bars-icon fa-solid fa-bars text-white",
  });

  bars.click(function () {
    const leftCol = $("#left-col");
    const rightCol = $("#right-col");
    if ($(window).width() < 768) {
      overlay.show();
      leftCol.toggleClass("d-none");
    } else {
      leftCol.toggleClass("d-none");
      rightCol.toggleClass("col-md-12");
      rightCol.toggleClass("col-md-10");
    }
  });
  overlay.click(function () {
    const leftCol = $("#left-col");
    if ($(window).width() < 768) {
      overlay.hide();
      leftCol.toggleClass("d-none");
    }
  });

  return bars;
}

function createSideBar() {
  let row = createRow();
  let sideBarHeader = createSideBarHeader();
  let sideBarBody = createSideBarBody();
  let hr = createHr();
  row.append(sideBarHeader, hr, sideBarBody);
  return row;
}

function createSideBarBody() {
  let col = createCol("side-bar-body", "12 p-0");
  list = $("<ul>", {
    class: "list-unstyled",
  });
  for (let i = 0; i < sideBarList.length; i++) {
    let sideBarItem = createSideBarItem(sideBarList[i]);
    if (sideBarList[i] == "Employee Masters"){
      sideBarItem.on("click", function() {

        window.location.replace("empsdetails")
      });
    }
    if (sideBarList[i] == 'Home'){
      sideBarItem.on("click", function() {
        window.location.replace("")
      });
    }
    if (sideBarList[i] == "Transactions") {
      sideBarItem.on("click", function () {
        window.location.replace("bills");
      });
    }
    list.append(sideBarItem);
  }
  col.append(list);
  return col;
}

function createSideBarItem(item) {
  const li = $("<li>", {
    class: "list-group-item px-4 py-2",
    text: item,
  });

  li.hover(
    function () {
      $(this).css("background-color", "#324A5F");
    },
    function () {
      $(this).css("background-color", "");
    }
  );

  return li;
}

function createSideBarHeader() {
  return $("<h3>", {
    class: "col-12 text-center my-3",
    text: "IFMIS",
  });
}

function createContainerFluid(id) {
  return $("<div>", {
    class: "container-fluid",
    id: id,
  });
}

function createContainerFluidFlex(id) {
  return $("<div>", {
    class: "container-fluid p-0 d-flex flex-column",
    id: id,
  });
}
function createRow(id) {
  return $("<div>", {
    class: "row",
    id: id,
  });
}

function createCol(id, classes) {
  return $("<div>", {
    class: `col-md-${classes}`,
    id: id,
  });
}

function createHr() {
  return $("<hr>", {
    class: "m-0",
    style: "height:1px",
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToWords(number) {
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

  const tensWords = [
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

  const MAX_DIGITS = 11;

  if ((number = number.toString()).length > MAX_DIGITS) {
    return "Overflow";
  }

  const numValue = ("00000000000" + number)
    .substr(-MAX_DIGITS)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

  if (!numValue) {
    return "";
  }

  let amountInWords = "";

  const processThreeDigitValue = (value, unitName) => {
    if (value != 0) {
      amountInWords +=
        (words[Number(value)] || tensWords[value[0]] + " " + words[value[1]]) +
        " " +
        unitName +
        " ";
    }
  };

  processThreeDigitValue(numValue[1], "Hundred");
  processThreeDigitValue(numValue[2], "Crore");
  processThreeDigitValue(numValue[3], "Lakh");
  processThreeDigitValue(numValue[4], "Thousand");
  processThreeDigitValue(numValue[5], "Hundred");

  if (numValue[6] != 0) {
    amountInWords +=
      (amountInWords !== "" ? "and " : "") +
      (words[Number(numValue[6])] ||
        tensWords[numValue[6][0]] + " " + words[numValue[6][1]]);
  }

  return amountInWords;
}
