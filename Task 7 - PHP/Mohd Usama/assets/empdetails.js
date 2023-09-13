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

let frontendData = {
  "Total Gross/Earnings": 0,
  "Total Deductions": 0,
  "Total Net": 0,
};

const overlay = $("<div>", {
  id: "overlay",
  class: "overlay",
});

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
  let col = createCol("empBody", "12");
  $.get("api/getEmployees.php", function (apiResponse) {
    const headers = [
      "S.No",
      "Employee Name",
      "Cader",
      "Department",

      "Designation",
      "Status",
      "Scale Type",
      "View",
    ];
    response = JSON.parse(apiResponse);
    const table = createTable(headers, response);

    col.append(table);
    showPage(1);
  });
  return col;
}

function createTable(headers, data) {
  const table = $("<table>").addClass(
    "table table-bordered table-responsive-md mt-2 table-hover"
  );
  createTableHeaders(table, headers);
  createTableBody(table, data);
  createTableFooter(table, data, headers);
  return table;
}

function createTableFooter(table, data, headers) {
  const tfoot = $("<tfoot>").append(
    $("<tr>").append(
      $("<td>", {
        colspan: headers.length,
        class: "text-center",
      }).append(createPagination(data.length))
    )
  );

  table.append(tfoot);
}

function createPagination(totalItems) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationList = $("<ul>").addClass("pagination");

  for (let page = 1; page <= totalPages; page++) {
    const pageItem = $("<li>")
      .addClass("page-item")
      .append(
        $("<a>", {
          href: "#",
          class: "page-link",
          text: page,
          click: function () {
            showPage(page);
          },
        })
      );

    paginationList.append(pageItem);
  }

  return paginationList;
}

function showPage(pageNumber) {
  currentPage = pageNumber;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const slicedData = response.slice(startIndex, endIndex);
  $("tbody").empty();
  createTableBody($("table"), slicedData);
  $(".pagination .page-item").removeClass("active");
  $(".pagination .page-item")
    .eq(currentPage - 1)
    .addClass("active");
}

function createTableHeaders(table, headers) {
  const headerRow = $("<tr>");
  headers.forEach((header) => {
    headerRow.append(
      $("<th>", {
        class: "bg-primary-subtle border text-primary",
      }).text(header)
    );
  });
  table.append($("<thead>").append(headerRow));
}

function createTableBody(table, data) {
  const tbody = $("<tbody>");
  data.forEach((item) => {
    const row = $("<tr>");
    const empid = item.id;
    const empdetailsid = item.employeedetailsid;
    const empname = item.employeename;
    const empdept = item.department;
    const empdesignation = item.designation;
    const empscaletype = item.scaletype;
    const empcaderstat = item.cader;
    row.append($("<td>").text(empdetailsid));
    row.append($("<td>").text(empname));
    row.append($("<td>").text(empcaderstat));
    row.append($("<td>").text(empdept));
    row.append($("<td>").text(empdesignation));
    const empStatus = (item.status = true ? "Working" : "Retired");
    row.append($("<td>").text(empStatus));
    row.append($("<td>").text(empscaletype));
    const viewButton = $("<button>")
      .text("View/Edit")
      .addClass("btn btn-primary btn-sm")
      .attr("data-id", empdetailsid)
      .on("click", function () {
        showCurrentEmpDetails(
          empid,
          empdetailsid,
          empname,
          empdept,
          empdesignation,
          empStatus,
          empcaderstat
        );
      });

    const buttonCell = $("<td>").append(viewButton);
    row.append(buttonCell);
    tbody.append(row);
  });
  table.append(tbody);
}

function showCurrentEmpDetails(
  empid,
  empdetailsid,
  empname,
  empdept,
  empdesignation,
  empStatus,
  empcaderstat
) {
  createEmployeeDetailsCard(
    empdetailsid,
    empname,
    empdept,
    empdesignation,
    empStatus,
    empcaderstat
  );
  createEmployeeDetailsOptions(empid, empdetailsid);
}

function createEmployeeDetailsOptions(empid, empdetailsid) {
  const empDetailsContainer = $("#empDetailsContainer");
  const empDetailsBody = createRow("empDetailsBody");
  const radioContainer = flexDiv();
  const radio1 = createRadioButton(
    "radioOption1",
    "Basic Details",
    "BasicDetails"
  );
  const radio2 = createRadioButton(
    "radioOption2",
    "Earnings And Deductions",
    "EarnAndDed"
  );
  $("#radioOption1").prop("checked", true);
  radioContainer.append(radio1);
  radioContainer.append(radio2);
  radioContainer.on("change", "input[name='radioOption']", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "BasicDetails") {
      createBasicDetails(empdetailsid, empDetailsBody);
    } else if (selectedValue === "EarnAndDed") {
      CreateEarnAndDed(empid, empDetailsBody);
    }
  });
  empDetailsContainer.append(radioContainer, empDetailsBody);
  $("#radioOption1").prop("checked", true);
  createBasicDetails(empdetailsid, empDetailsBody);
}

function createBasicDetails(empdetailsid, empDetailsBody) {
  $.post(
    "api/getEmployeeDetails.php",
    { employee_details_id: empdetailsid },
    function (empDetailsrespose) {
      if (empDetailsrespose.status) {
        const data = empDetailsrespose.data;
        const table = $("<table>").addClass("table table-bordered mt-3 mb-5");
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            let value = data[key];
            const row = $("<tr>").addClass("");
            const keyDiv = $("<div>")
              .addClass("p-2 fw-bold")
              .text(key.replace(/_/g, " ").toUpperCase());
            const seperator = $("<div>").addClass("p-2 fw-bold").text(":");
            const valueDiv = $("<div>")
              .addClass("p-2")
              .text(value)
              .css("white-space", "pre-wrap");
            const keyCell = $("<td>").append(keyDiv);
            const seperatorCell = $("<td>").append(seperator);
            const valueCell = $("<td>").append(valueDiv);
            row.append(keyCell, seperatorCell, valueCell);
            table.append(row);
          }
        }
        empDetailsBody.empty();
        empDetailsBody.append(table);
      } else {
        console.error("Error:", empDetailsRes.message);
      }
    }
  );
}

function CreateEarnAndDed(empid, empDetailsBody) {
  empDetailsBody.empty();
  row = createRow("earnAndDed");
  row.addClass("mt-2");
  $.post(
    "api/getEmployeeEarnAndDeds.php",
    { empid: empid },
    function (response) {
      const res = JSON.parse(response);
      createEarningsTable(row, empid, res.earnings);
      createDeductionsTable(row, empid, res.deductions);
      fetchDataAndGenerateNet(empid);
    }
  );
  empDetailsBody.append(row);
}

function handleEarnDedDelete(entry, amountCell) {
  const overlay = $("<div>")
    .addClass("overlay d-flex justify-content-center align-items-center")
    .css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)",
    });
  const amount = amountCell.text();
  const delCard = $("<div>").addClass("card").css("width", "18rem");
  const type = entry.earndeds_type;
  const cardBody = $("<div>").addClass("card-body");
  const cardTitle = $("<h5>").addClass("card-title").text("Confirm Deletion");
  const cardText = $("<p>")
    .addClass("card-text")
    .text("Are you sure you want to delete this entry?");

  const confirmButton = $("<button>")
    .addClass("btn btn-danger me-2")
    .text("Confirm")
    .click(function () {
      if (type == "Earning") {
        if (!validateDeleteEarningValues(parseInt(amount))) {
          return;
        }
      }
      $.post(
        "api/deleteEarnOrDed.php",
        { entryid: entry.earndeds_id },
        function (response) {
          result = JSON.parse(response);
          if (result.status) {
            $(`#earnOrDed-${entry.earndeds_id}`).remove();
            if (type == "Earning") {
              frontendData["Total Gross/Earnings"] =
                parseInt(frontendData["Total Gross/Earnings"]) -
                parseInt(amount);
            } else {
              frontendData["Total Deductions"] =
                parseInt(frontendData["Total Deductions"]) - parseInt(amount);
            }
            frontendData["Total Net"] =
              parseInt(frontendData["Total Gross/Earnings"]) -
              parseInt(frontendData["Total Deductions"]);
            updateNetTableValues();
          }
          overlay.remove();
        }
      );
    });

  const cancelButton = $("<button>")
    .addClass("btn btn-secondary")
    .text("Cancel")
    .click(function () {
      overlay.remove();
    });

  cardBody.append(cardTitle, cardText, confirmButton, cancelButton);
  delCard.append(cardBody);
  overlay.append(delCard);

  $("body").append(overlay);
}

function handleEarnDedEdit(entry, amountCell, actionCell) {
  const originalAmount = entry.amount;
  const type = entry.earndeds_type;
  const inputField = $("<input>")
    .val(originalAmount)
    .addClass("form-control")
    .attr("type", "text")
    .attr("maxlength", 10)
    .on("input", function () {
      let sanitizedValue = $(this)
        .val()
        .replace(/[^0-9]/g, "");
      sanitizedValue = sanitizedValue.substring(0, 10);
      $(this).val(sanitizedValue);
    })
    .appendTo(amountCell.empty());

  const saveButton = $("<button>")
    .text("Save")
    .addClass("btn btn-success btn-sm me-2 save-button")
    .click(() => {
      const newAmount = inputField.val();
      if (type == "Deduction") {
        if (!validateDeductionValues(parseInt(newAmount))) {
          return;
        }
      } else {
        if (
          !validateEarningValues(parseInt(originalAmount), parseInt(newAmount))
        ) {
          return;
        }
      }
      actionCell.find(".save-button").remove();
      actionCell.find(".edit-button").show();
      actionCell.find(".delete-button").show();
      actionCell.find(".cancel-button").remove();
      $.post(
        "api/updateEarnOrDed.php",
        { entryid: entry.earndeds_id, amount: newAmount },
        function (response) {
          result = JSON.parse(response);
          if (result.status) {
            amountCell.text(newAmount);
            entry.amount = newAmount;
            if (type === "Earning") {
              frontendData["Total Gross/Earnings"] =
                parseInt(frontendData["Total Gross/Earnings"]) -
                parseInt(originalAmount) +
                parseInt(newAmount);
            } else {
              frontendData["Total Deductions"] =
                parseInt(frontendData["Total Deductions"]) -
                parseInt(originalAmount) +
                parseInt(newAmount);
            }
            frontendData["Total Net"] =
              parseInt(frontendData["Total Gross/Earnings"]) -
              parseInt(frontendData["Total Deductions"]);
            updateNetTableValues();
          }
        }
      );
    });

  const cancelButton = $("<button>")
    .text("Cancel")
    .addClass("btn btn-secondary btn-sm cancel-button")
    .click(() => {
      amountCell.text(originalAmount);
      actionCell.find(".save-button").remove();
      actionCell.find(".edit-button").show();
      actionCell.find(".delete-button").show();
      actionCell.find(".cancel-button").remove();
    });
  actionCell.find(".edit-button").hide();
  actionCell.find(".delete-button").hide();
  actionCell.append(saveButton, cancelButton);
}

function validateDeleteEarningValues(delAmount) {
  const currentTotalVal = parseInt(frontendData["Total Net"]);
  if (currentTotalVal - delAmount < 0) {
    alert("Total Net Cannot be less than 0");
    return false;
  }
  return true;
}

function validateEarningValues(originalAmount, newAmount) {
  const currentEarningVal =
    parseInt(frontendData["Total Gross/Earnings"]) - originalAmount;
  const currentDeductionVal = parseInt(frontendData["Total Deductions"]);
  const newTotalVal = currentEarningVal + newAmount;
  if (newAmount <= 0) {
    alert("Amount cannot be less than or equal to 0");
    return false;
  }
  if (newTotalVal - currentDeductionVal < 0) {
    alert("Total Net cannot be less than 0");
    return false;
  }
  return true;
}

function handleAddDeduction(empid) {
  const earndeds_type = "Deduction";
  const earndeds_employee_id = empid;

  const overlay = $("<div>")
    .addClass("overlay d-flex justify-content-center align-items-center")
    .css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)",
    });

  let category_id;
  let category_name;

  const DeductionsCard = $("<div>")
    .addClass("card shadow-lg")
    .css("width", "18rem");

  const cardBody = $("<div>").addClass("card-body p-4");

  const cardTitle = $("<h5>")
    .addClass("card-title mb-4")
    .text("Add Deductions");

  const select = $("<select>").addClass("form-select mb-3").appendTo(cardBody);

  const inputField = $("<input>")
    .addClass("form-control mb-3")
    .attr("type", "text")
    .attr("placeholder", "Amount")
    .attr("maxlength", 10)
    .on("input", function () {
      let sanitizedValue = $(this)
        .val()
        .replace(/[^0-9]/g, "");
      sanitizedValue = sanitizedValue.substring(0, 10);
      $(this).val(sanitizedValue);
    })
    .appendTo(cardBody);

  const confirmButton = $("<button>")
    .addClass("btn btn-primary me-2")
    .text("ADD");

  const cancelButton = $("<button>")
    .addClass("btn btn-secondary")
    .text("Cancel");

  $.get("api/getDeductionsList.php", function (apiResponse) {
    if (apiResponse.status) {
      const options = apiResponse.data.map((e) => {
        return `<option value="${e.deduction_category_id}">${e.deduction_category_name}</option>`;
      });
      select.append(options);
    }
  });

  select.change(function () {
    category_id = $(this).val();
    category_name = $(this).find(":selected").text();
  });

  confirmButton.click(function () {
    if (!validateDeductionValues(inputField.val())) {
      return;
    }
    $.post(
      "api/addNewEarnOrDed.php",
      {
        empid: earndeds_employee_id,
        type: earndeds_type,
        amount: inputField.val(),
        category_id: select.val(),
      },
      function (response) {
        result = JSON.parse(response);
        if (result.status) {
          if (result.code == "Updated") {
            alert(result.message);
          } else {
            frontendData["Total Deductions"] =
              parseInt(frontendData["Total Deductions"]) +
              parseInt(inputField.val());
            frontendData["Total Net"] =
              parseInt(frontendData["Total Gross/Earnings"]) -
              parseInt(frontendData["Total Deductions"]);
            updateNetTableValues();
            const entryData = {
              earndeds_id: result.inserted_id,
              earndeds_category_name: select.find(":selected").text(),
              amount: inputField.val(),
              earndeds_type: earndeds_type,
            };

            const newRow = createTableRow(
              entryData,
              handleEarnDedEdit,
              handleEarnDedDelete
            );
            $(".deduction-table").append(newRow);
          }
        }
        overlay.remove();
      }
    );
  });

  cancelButton.click(function () {
    overlay.remove();
  });

  cardBody.append(
    cardTitle,
    select,
    inputField,
    $("<div>")
      .addClass("d-flex justify-content-end")
      .append(confirmButton, cancelButton)
  );
  DeductionsCard.append(cardBody);
  overlay.append(DeductionsCard);
  $("body").append(overlay);
}

function validateDeductionValues(newAmount) {
  const currentEarningVal = frontendData["Total Gross/Earnings"];
  const currentTotalVal = frontendData["Total Net"];
  if (newAmount >= currentEarningVal || newAmount >= currentTotalVal) {
    alert("Amount cannot be greater than current Gross/Earnings or Total Net");
    return false;
  }
  return true;
}

function handleAddEarning(empid) {
  const overlay = $("<div>")
    .addClass("overlay d-flex justify-content-center align-items-center")
    .css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)",
    });

  const EarningsCard = $("<div>")
    .addClass("card shadow-lg")
    .css("width", "18rem");

  const cardBody = $("<div>").addClass("card-body p-4");

  const cardTitle = $("<h5>").addClass("card-title mb-4").text("Add Earnings");

  const select = $("<select>").addClass("form-select mb-3").appendTo(cardBody);

  const inputField = $("<input>")
    .addClass("form-control mb-3")
    .attr("type", "text")
    .attr("placeholder", "Amount")
    .attr("maxlength", 10)
    .on("input", function () {
      let sanitizedValue = $(this)
        .val()
        .replace(/[^0-9]/g, "");
      sanitizedValue = sanitizedValue.substring(0, 10);
      $(this).val(sanitizedValue);
    })
    .appendTo(cardBody);

  const confirmButton = $("<button>")
    .addClass("btn btn-primary me-2")
    .text("ADD");

  const cancelButton = $("<button>")
    .addClass("btn btn-secondary")
    .text("Cancel");

  $.get("api/getEarningsList.php", function (apiResponse) {
    if (apiResponse.status) {
      const options = apiResponse.data.map((e) => {
        return `<option value="${e.earning_category_id}">${e.earning_category_name}</option>`;
      });
      select.append(options);
    }
  });

  select.change(function () {
    category_id = $(this).val();
    category_name = $(this).find(":selected").text();
  });

  confirmButton.click(function () {
    $.post(
      "api/addNewEarnOrDed.php",
      {
        empid: empid,
        type: "Earning",
        amount: inputField.val(),
        category_id: select.val(),
      },
      function (response) {
        result = JSON.parse(response);
        if (result.status) {
          const entryData = {
            earndeds_id: result.inserted_id,
            earndeds_category_name: select.find(":selected").text(),
            amount: inputField.val(),
            earndeds_type: "Earning",
          };
          if (result.code == "Updated") {
            alert(result.message);
          } else {
            const newRow = createTableRow(
              entryData,
              handleEarnDedEdit,
              handleEarnDedDelete
            );
            $(".earning-table").append(newRow);
            frontendData["Total Gross/Earnings"] =
              parseInt(frontendData["Total Gross/Earnings"]) +
              parseInt(inputField.val());
            frontendData["Total Net"] =
              parseInt(frontendData["Total Gross/Earnings"]) -
              parseInt(frontendData["Total Deductions"]);
            updateNetTableValues();
          }
        }
        overlay.remove();
      }
    );
  });

  cancelButton.click(function () {
    overlay.remove();
  });

  cardBody.append(
    cardTitle,
    select,
    inputField,
    $("<div>")
      .addClass("d-flex justify-content-end")
      .append(confirmButton, cancelButton)
  );

  EarningsCard.append(cardBody);

  overlay.append(EarningsCard);

  $("body").append(overlay);
}

function createTableRow(entry, editActionHandler, deleteActionHandler) {
  const category = entry.earndeds_category_name;
  const amount = entry.amount;

  const row = $("<tr>", {
    id: `earnOrDed-${entry.earndeds_id}`,
  });

  const categoryCell = $("<td>").text(category);
  const amountCell = $("<td>").addClass("amount-cell").text(amount);

  const actionCell = $("<td>");
  const editButton = $("<button>")
    .text("Edit")
    .addClass("btn btn-primary btn-sm me-2 edit-button")
    .click(() => editActionHandler(entry, amountCell, actionCell));
  const deleteButton = $("<button>")
    .text("Delete")
    .addClass("btn btn-danger btn-sm delete-button")
    .click(() => deleteActionHandler(entry, amountCell));
  actionCell.append(editButton, deleteButton);

  row.append(categoryCell, amountCell, actionCell);

  return row;
}

function updateNetTableValues() {
  if (frontendData) {
    let table = $(".net-table");
    if (!table.length) {
      table = $("<table>").addClass("table table-bordered net-table");
      $(".earning-table-container").append(table);
    }
    table.empty();
    for (const type in frontendData) {
      if (frontendData.hasOwnProperty(type)) {
        const row = $("<tr>");
        const typeCell = $("<td>", {
          class: "fw-bold",
        }).text(type);
        const sumCell = $("<td>", {
          class: "fw-bold",
        }).text(frontendData[type]);
        row.append(typeCell, sumCell);
        table.append(row);
      }
    }
  }
}
function fetchDataAndGenerateNet(empid) {
  $.post(
    "api/getTotalEarnAndDed.php",
    { empid: empid },
    function (apiResponse) {
      if (apiResponse.status) {
        frontendData = apiResponse.data;
        updateNetTableValues();
      }
    }
  );
}

function createEarningsTable(row, empid, earnings) {
  const col = $("<div>").addClass("col-md-6 earning-table-container");
  const tableContainer = $("<div>").addClass("table-container");
  const earningsTable = $("<table>").addClass(
    "table table-bordered earning-table"
  );
  const thead = $("<thead>");
  const headerRow = $("<tr>");
  const tableHeaders = ["Description", "Amount", "Action"];

  for (const headerText of tableHeaders) {
    const header = $("<th>").text(headerText);
    headerRow.append(header);
  }

  thead.append(headerRow);
  earningsTable.append(thead);

  for (const entry of earnings) {
    const category = entry.earndeds_category_name;
    const amount = entry.amount;

    const row = $("<tr>", {
      id: `earnOrDed-${entry.earndeds_id}`,
    });

    const categoryCell = $("<td>").text(category);
    const amountCell = $("<td>").addClass("amount-cell").text(amount);

    const actionCell = $("<td>");
    const editButton = $("<button>")
      .text("Edit")
      .addClass("btn btn-primary btn-sm me-2 edit-button")
      .click(() => handleEarnDedEdit(entry, amountCell, actionCell));
    const deleteButton = $("<button>")
      .text("Delete")
      .addClass("btn btn-danger btn-sm delete-button")
      .click(() => handleEarnDedDelete(entry, amountCell));
    actionCell.append(editButton, deleteButton);

    row.append(categoryCell, amountCell, actionCell);
    earningsTable.append(row);
  }

  const earningsHeading = $("<h3>").text("EARNINGS");
  const addButton = $("<button>")
    .addClass("btn btn-primary")
    .text("+ Add Earning")
    .click(() => handleAddEarning(empid));

  const headingButtonContainer = $("<div>")
    .addClass("d-flex justify-content-between align-items-center mb-3")
    .append(earningsHeading, addButton);

  tableContainer.append(headingButtonContainer, earningsTable);
  col.append(tableContainer);
  row.append(col);
}

function createDeductionsTable(row, empid, deductions) {
  const col = $("<div>").addClass("col-md-6");
  const tableContainer = $("<div>").addClass("table-container");
  const deductionsTable = $("<table>").addClass(
    "table table-bordered deduction-table"
  );
  const thead = $("<thead>");
  const headerRow = $("<tr>");
  const tableHeaders = ["Description", "Amount", "Action"];

  for (const headerText of tableHeaders) {
    const header = $("<th>").text(headerText);
    headerRow.append(header);
  }

  thead.append(headerRow);
  deductionsTable.append(thead);

  for (const entry of deductions) {
    const category = entry.earndeds_category_name;
    const amount = entry.amount;

    const row = $("<tr>", {
      id: `earnOrDed-${entry.earndeds_id}`,
    });

    const categoryCell = $("<td>").text(category);
    const amountCell = $("<td>").addClass("amount-cell").text(amount);

    const actionCell = $("<td>");
    const editButton = $("<button>")
      .text("Edit")
      .addClass("btn btn-primary btn-sm me-2 edit-button")
      .click(() => handleEarnDedEdit(entry, amountCell, actionCell));
    const deleteButton = $("<button>")
      .text("Delete")
      .addClass("btn btn-danger btn-sm delete-button")
      .click(() => handleEarnDedDelete(entry, amountCell));
    actionCell.append(editButton, deleteButton);

    row.append(categoryCell, amountCell, actionCell);
    deductionsTable.append(row);
  }

  const deductionsHeading = $("<h3>").text("DEDUCTIONS");
  const addButton = $("<button>")
    .addClass("btn btn-primary")
    .text("+ Add Deduction")
    .click(() => handleAddDeduction(empid));

  const headingButtonContainer = $("<div>")
    .addClass("d-flex justify-content-between align-items-center mb-3")
    .append(deductionsHeading, addButton);

  tableContainer.append(headingButtonContainer, deductionsTable);
  col.append(tableContainer);
  row.append(col);
}

function createRadioButton(id, label, value) {
  const radioDiv = $("<div>").addClass("form-check form-check-inline");
  const radioInput = $("<input>")
    .addClass("form-check-input")
    .attr("type", "radio")
    .attr("name", "radioOption")
    .attr("id", id)
    .attr("value", value);
  const radioLabel = $("<label>")
    .addClass("form-check-label")
    .attr("for", id)
    .text(label);
  radioDiv.append(radioInput);
  radioDiv.append(radioLabel);
  return radioDiv;
}

function createEmployeeDetailsCard(
  empdetailsid,
  empname,
  empdept,
  empdesignation,
  empStatus,
  empcaderstat
) {
  $("#empBody").empty();
  const card = $("<div>").addClass("card mt-2 empCard");
  const row = $("<div>").addClass("row g-0");
  const colLeft = $("<div>").addClass("col-md-3 ");
  const colRight = $("<div>").addClass("col-md-9");
  const img = $("<img>", {
    class: "profile-img bg-primary-subtle",
  })
    .attr({
      src: "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1",
      alt: "Profile Image",
    })
    .addClass("img-fluid rounded-start");
  const cardBody = $("<div>").addClass("card-body bg-primary-subtle h-100");
  const cardTitle = $("<h1>").addClass("card-title").text(empname);
  const empStatusDiv = flexDiv();
  const idAndDesig = flexDiv();
  const carderAndDept = flexDiv();
  const cardEmpStatus = $("<p>")
    .addClass("card-text badge bg-success rounded-5")
    .text(`Status: ${empStatus}`);
  const cardEmpApprovStatus = $("<p>")
    .addClass("card-text badge text-black ")
    .text(`Approved: Approved`);
  empStatusDiv.append(cardEmpStatus, cardEmpApprovStatus);
  const hr = createHr();
  const cardEmpId = $("<p>")
    .addClass("card-text fw-bold mx-md-5 mx-2")
    .text(`Employee Code: ${empdetailsid}`);
  const cardEmpDesignation = $("<p>")
    .addClass("card-text fw-bold mx-md-5 mx-2")
    .text(`Designation: ${empdesignation}`);
  idAndDesig.append(cardEmpId, cardEmpDesignation);
  const cardEmpDept = $("<p>")
    .addClass("card-text fw-bold mx-md-5 mx-2")
    .text(`Department: ${empdept}`);
  const cardEmpCaderStat = $("<p>")
    .addClass("card-text fw-bold mx-md-5 mx-2")
    .text(`Cader: ${empcaderstat}`);
  carderAndDept.append(cardEmpCaderStat, cardEmpDept);
  colLeft.append(img);
  cardBody.append(cardTitle, empStatusDiv, hr, idAndDesig, carderAndDept);
  colRight.append(cardBody);
  row.append(colLeft, colRight);
  card.append(row);
  $("#empBody").append(card, createContainerFluid("empDetailsContainer"));
}

function flexDiv() {
  return $("<div>", {
    class: "d-flex",
  });
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
    if (sideBarList[i] == "Employee Masters") {
      sideBarItem.on("click", function () {
        window.location.replace("empsdetails");
      });
    }
    if (sideBarList[i] == "Home") {
      sideBarItem.on("click", function () {
        window.location.replace("/");
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
