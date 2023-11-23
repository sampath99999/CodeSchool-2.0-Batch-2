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

const months = [
  { 1: "January" },
  { 2: "February" },
  { 3: "March" },
  { 4: "April" },
  { 5: "May" },
  { 6: "June" },
  { 7: "July" },
  { 8: "August" },
  { 9: "September" },
  { 10: "October" },
  { 11: "November" },
  { 12: "December" },
];
const years = [2023];

const overlay = $("<div>", {
  id: "overlay",
  class: "overlay",
});

let frontendData = {
  gross: 0,
  dedn: 0,
  net: 0,
};

let totalEmps = 0;
let emps = [];
let removeEmps = [];
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
  const billDetails = createBillDetails();
  mainContentBody.append(billDetails);
  col.append(mainContentBody);
  return col;
}

function createBillDetails() {
  const col = createCol("bill-details", "12");
  const row = createRow();
  const billDetails = createBillDetailsBill(row);
  row.append(billDetails);
  col.append(row);
  return col;
}

function createDetailsBody(detailsBody, id) {
  $.post("api/getDepartmentBillDetails.php", { id: id }, function (data) {
    const response = JSON.parse(data);
    if (response.status) {
      createDetailsBodyRows(detailsBody, response.data, response.total, id);
      createViewPayBill(detailsBody);
    }
  });
}

function createDetailsBodyRows(detailsBody, response, total, id) {
  const container = $("<div>").addClass("bill-employees-container px-5");
  const div = flexDiv("justify-content-between mb-4", "details-header");
  const selectedCheckboxes = [];
  const detailsHeader = createDetailsHeader(div, id, selectedCheckboxes);
  const table = $("<table>").addClass(
    "table table-striped table-bordered table-hover table-responsive"
  );
  const thead = $("<thead>").addClass("thead-dark").appendTo(table);
  const tbody = $("<tbody>").appendTo(table);
  const tfoot = $("<tfoot>").addClass("table-footer").appendTo(table);
  const headerRow = $("<tr>").appendTo(thead);

  $("<th>").addClass("fw-bold").text("S.no").appendTo(headerRow);
  $("<th>").addClass("fw-bold").text("Select").appendTo(headerRow);
  const columnKeys = Object.keys(response[0]);

  columnKeys.forEach((key) => {
    $("<th>").addClass("fw-bold").text(key).appendTo(headerRow);
  });

  response.forEach((employee, index) => {
    const checkboxId = employee.empcode;
    emps.push(checkboxId);
    const row = $("<tr>").attr("id", checkboxId).appendTo(tbody);
    $("<td>")
      .text(index + 1)
      .appendTo(row);
    const checkboxCell = $("<td>").appendTo(row);
    const checkbox = $("<input>")
      .attr("type", "checkbox")
      .attr("id", `checkbox-${checkboxId}`)
      .appendTo(checkboxCell);
    checkbox.on("change", function () {
      if (this.checked) {
        selectedCheckboxes.push(checkboxId);
      } else {
        const indexToRemove = selectedCheckboxes.indexOf(checkboxId);
        if (indexToRemove !== -1) {
          selectedCheckboxes.splice(indexToRemove, 1);
        }
      }
    });

    columnKeys.forEach((key) => {
      if (key == "gross" || key == "dedn" || key == "net") {
        $("<td>")
          .attr("id", `${key}-${checkboxId}`)
          .text(employee[key])
          .appendTo(row);
      } else {
        $("<td>").text(employee[key]).appendTo(row);
      }
    });
    const actionCell = $("<td>").appendTo(row);
    $("<button>")
      .text("View")
      .addClass("btn btn-primary btn-sm me-2 edit-button")
      .click(() =>
        viewEmployee(
          checkboxId,
          employee["employeename"],
          employee["gross"],
          employee["dedn"]
        )
      )
      .appendTo(actionCell);
  });

  const footerRow = $("<tr>").appendTo(tfoot);
  $("<td>")
    .attr("colspan", "2")
    .addClass("fw-bold")
    .text("Total")
    .appendTo(footerRow);
  columnKeys.forEach((key) => {
    const totalValue = total[0][key];
    if (frontendData[key] == 0 || frontendData[key]) {
      frontendData[key] = total[0][key];
    }
    $("<td>")
      .attr("id", `total-${key}`)
      .addClass("fw-bold")
      .text(totalValue)
      .appendTo(footerRow);
  });
  container.append(detailsHeader);
  container.append(table);
  detailsBody.append(container);
}

function createViewPayBill(detailsBody) {
  const centeredDiv = $("<div>")
    .addClass("d-flex justify-content-center align-items-center my-3")
    .attr("id", "pay-bill-btn")
    .appendTo("body");
  $("<button>")
    .addClass("btn btn-success")
    .text("VIEW PAY BILL")
    .click(() => createBill($("#billselect").val()))
    .appendTo(centeredDiv);
  detailsBody.append(centeredDiv);
}

function generateBillLayout(id, response, amount, month, year) {
  const mainContainer = $("#bill-details");
  const logoImg = $("<img>", {
    src: "images/mobile-logo.png",
    alt: "logo",
    class: "logo d-inline-block  img-fluid my-auto",
    style: "max-height: 70%;",
  });
  const headingText = "GOVERNMENT OF TELANGANA";
  const heading = $("<h1>", {
    class: "d-inline-block",
  }).text(headingText);
  const headingDiv = $("<div>", {
    class: "text-center mt-3 mb-1",
  }).append(logoImg, heading);
  const subHeadingDiv = $("<div>")
    .addClass("text-center")
    .append($("<h4>").text("(TSTC Form-47)"), $("<h5>").text("Salary Bill"));
  const flexDiv = $("<div>").addClass("d-flex flex-column");
  const billInfo = createBillInfo(id);
  const tableDiv = createTableDiv(response);
  const largeTable = $("<table>").addClass("table table-bordered");
  const largeTableRow = $("<tr>");
  const headings = [
    "S.no",
    "Name",
    "Bank Ac No.",
    "IFCS",
    "Bank Branch",
    "Amount",
  ];
  for (var i = 0; i < 6; i++) {
    largeTableRow.append($("<th>").text(headings[i]));
  }
  largeTable.append(largeTableRow);
  createEmpBillsTable(largeTable, response, amount);
  const uploadButton = createUploadDocs();
  const remarksTextarea = $("<textarea>")
    .addClass("form-control mt-3")
    .attr("placeholder", "Enter remarks...");
  const generateDiv = $("<div>", {
    class: "text-center mt-3 mb-1",
  });
  const generateButton = createGenerateButton(id, month, year, amount);
  generateDiv.append(generateButton);
  flexDiv.append(billInfo);
  mainContainer.append(
    headingDiv,
    subHeadingDiv,
    flexDiv,
    tableDiv,
    largeTable,
    uploadButton,
    remarksTextarea,
    generateDiv
  );
}

function createGenerateButton(id, month, year, amount) {
  const generateButton = $("<button>")
    .addClass("btn btn-success mt-3")
    .text("Generate Pay Bill");
  function handleClick() {
    const totalEarning = $("#total-earning").text();
    const totalDeduction = $("#total-deduction").text();
    const totalNet = parseInt(totalEarning) - parseInt(totalDeduction);
    generatePDF(
      id,
      month,
      year,
      totalEarning,
      totalDeduction,
      totalNet,
      amount
    );
  }
  generateButton.click(handleClick);
  return generateButton;
}

function createEmployeeRow(employee, index, amount) {
  const row = $("<tr>");
  const serialNumberCell = $("<td>").text(index + 1);
  row.append(serialNumberCell);
  const nameCell = $("<td>").text(employee.employee_name);
  row.append(nameCell);
  const accountNumberCell = $("<td>").text(employee.bank_account_number);
  row.append(accountNumberCell);
  const ifscCodeCell = $("<td>").text(employee.ifsc_code);
  row.append(ifscCodeCell);
  const branchCell = $("<td>").text(employee.bank_branch);
  row.append(branchCell);
  const amountCell = $("<td>").text(amount);
  row.append(amountCell);

  return row;
}

function createEmpBillsTable(table, data, amount) {
  const tbody = $("<tbody>");
  const emps = data.employees;
  let total = 0;
  emps.forEach((employee, index) => {
    const row = createEmployeeRow(employee, index, amount[index]);
    total += parseInt(amount[index]);
    tbody.append(row);
  });
  const totalRow = $("<tr>");
  const totalCell = $("<td>").text(total);
  const totalText = $("<td>", {
    class: "fw-bold",
  }).text("Total");
  totalRow.append($("<td>").attr("colspan", 4));
  totalRow.append(totalText);
  totalRow.append(totalCell);
  tbody.append(totalRow);

  table.append(tbody);
}

function createTableDiv(result) {
  const table1 = createBillTable(
    "Earnings",
    result.earnings,
    "Total Earnings",
    result.total_earnings,
    "total-earning"
  );
  const table2 = createBillTable(
    "Deductions",
    result.deductions,
    "Total Deductions",
    result.total_deductions,
    "total-deduction"
  );

  return $("<div>")
    .addClass("d-flex justify-content-between gap-5")
    .append(table1, table2);
}

function createBillTable(category, data, totalCategory, totalAmount, id) {
  const table = $("<table>").addClass("table");
  const tableRow = $("<tr>").addClass("dashed-border");

  tableRow.append($("<th>").text(category));
  tableRow.append($("<th>").text("Amount"));
  table.append(tableRow.clone());
  for (const [key, value] of Object.entries(data)) {
    const row = $("<tr>");
    row.append($("<td>").text(key));
    row.append($("<td>").text(value));
    table.append(row);
  }

  if (totalAmount > 0) {
    const totalRow = $("<tr>").addClass("dashed-border");
    totalRow.append($("<td>").text(totalCategory));
    totalRow.append($("<td>").attr("id", id).text(totalAmount));
    table.append(totalRow);
  }

  table.addClass("table-responsive");
  return table;
}

function createBillInfoItem(label, value) {
  const labelElement = $("<h6>").text(label);
  const valueElement = $("<p>").text(value);

  const col = $("<div>").addClass("col-md-6");
  const colData = $("<div>").addClass("col-md-6");

  col.append(labelElement);
  colData.append(valueElement);

  return [col, colData];
}

function createBillInfo(id) {
  const billInfo = $("<div>").addClass("bill-info");
  const billInfoRow = $("<div>").addClass("row");

  const billInfoItems = [
    createBillInfoItem("Bill ID", id),
    createBillInfoItem("Dept No", id),
    createBillInfoItem("Total No of Employees", totalEmps),
  ];

  for (const [col, colData] of billInfoItems) {
    billInfoRow.append(col, colData);
  }

  billInfo.append(billInfoRow);
  return billInfo;
}

function generatePDF(
  id,
  month,
  year,
  totalEarning,
  totalDeduction,
  totalNet,
  amount
) {
  const empIDS = emps;
  $.post(
    "api/createDepartmentBill.php",
    {
      id: parseInt(id),
      billData: {
        bill_month: parseInt(month),
        bill_year: parseInt(year),
        total_earnings: parseInt(totalEarning),
        total_deductions: parseInt(totalDeduction),
        net_amount: parseInt(totalNet),
        bill_upload_file: null,
      },
      beneficiaries: empIDS.map((employeeId, index) => ({
        employee_id: parseInt(employeeId),
        amount: parseInt(amount[index]),
      })),
    },
    function (data) {
      const response = JSON.parse(data);
      if (response.status) {
        if (response.code == "new") {
          bill_pk = response.bill_pk;
          const hiddenInput = $("#idInput");
          const hiddenBtn = $("#hiddenSubmitBtn");
          hiddenInput.val(bill_pk);
          hiddenBtn.click();
        }
        $("#selectedFilesList").empty();
        const specialElementHandlers = {
          "#editor": function (element, renderer) {
            return true;
          },
        };

        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "ledger",
          putOnlyUsedFonts: true,
          precision: 100,
        });

        pdf.fromHTML(
          $("#bill-details").html(),
          30,
          0,
          {
            width: 500,
            elementHandlers: {
              "#bill-details": specialElementHandlers,
            },
          },
          function () {
            pdf.save(`Bill-of-${id}-for-month-${month}-for-year-${year}.pdf`);
          }
        );
      } else {
        console.log(response);
      }
    }
  );
}

function createBill(id) {
  const inputs = validateBillInputs();
  if (!inputs) {
    return;
  }
  const month = $("#selectmonth").val();
  const year = $("#selectyear").val();
  const noemps = -1;
  if (removeEmps.length == 0) {
    removeEmps.push(noemps);
  }
  const empNet = [];
  $.each(emps, function (index, value) {
    const net = $(`#net-${value}`).text();
    if (parseInt(net)) {
      empNet.push(net);
    }
  });
  $.post(
    "api/getDepartmentBill.php",
    { id: id, exclude_ids: removeEmps },
    function (data) {
      const response = JSON.parse(data);
      if (response.status) {
        $("#bill-details").empty();
        generateBillLayout(id, response, empNet, month, year);
      } else {
        alert("Something went wrong");
      }
    }
  );
}

function validateBillInputs() {
  const month = $("#selectmonth").val();
  const year = $("#selectyear").val();
  const scale = $("#selectscale").val();
  if (month == "" || year == "" || scale == "") {
    alert("Enter Scale, Month And Year");
    return false;
  }
  return [month, year];
}

function viewEmployee(id, name, earning, dedn) {
  overlay.show();
  $.post("api/getEmployeeEarnAndDeds.php", { empid: id }, function (data) {
    const response = JSON.parse(data);
    if (response.status) {
      $("#left-col").css({
        "z-index": 1,
      });
      const cardContainer = $("<div>").addClass("card mt-3 mx-3 p-2 emp-card");

      const cardHeader = $("<div>").addClass(
        "card-header d-flex justify-content-between align-items-center"
      );

      const cardTitle = $("<h5>")
        .addClass("card-title")
        .text("Earnings & Deductions");

      const closeButton = $("<button>")
        .addClass("btn btn-danger btn-sm")
        .text("Close")
        .click(function () {
          $("#left-col").css({
            "z-index": 4,
          });
          cardContainer.remove();
          overlay.hide();
        });

      cardHeader.append(cardTitle, closeButton);

      const cardBody = $("<div>").addClass("card-body");

      const empName = $("<h3>").addClass("card-title").text(`Name: ${name}`);

      cardBody.append(empName);

      const tablesContainer = $("<div>").addClass(
        "d-flex justify-content-between"
      );

      const earningsTable = createTable("Earnings", response.earnings, earning);
      const deductionsTable = createTable(
        "Deductions",
        response.deductions,
        dedn
      );

      tablesContainer.append(earningsTable, deductionsTable);

      cardBody.append(tablesContainer);
      cardContainer.append(cardHeader, cardBody);
      overlay.append(cardContainer);
    }
  });
}

function createTable(title, data, total) {
  const $table = $("<table>").addClass(
    "table table-bordered table-hover mb-4 px-2 mx-2"
  );
  const $tableHead = $("<thead>");
  const $tableHeadRow = $("<tr>");
  const $tableHeadCell = $("<th>").attr("colspan", "2").text(title);

  $tableHeadRow.append($tableHeadCell);
  $tableHead.append($tableHeadRow);
  $table.append($tableHead);
  const $tableBody = $("<tbody>");
  data.forEach((item) => {
    const $row = $("<tr>");
    const $typeCell = $("<td>").text(item.earndeds_category_name);
    const $amountCell = $("<td>").text(item.amount);

    $row.append($typeCell, $amountCell);
    $tableBody.append($row);
  });

  $table.append($tableBody);
  const $tableFooter = $("<tfoot>").addClass("table-footer");
  const $footerRow = $("<tr>");
  const $footerTotalCell = $("<td>").addClass("fw-bold").text("Total");

  const $footerAmountCell = $("<td>").addClass("fw-bold").text(total);

  $footerRow.append($footerTotalCell, $footerAmountCell);
  $tableFooter.append($footerRow);
  $table.append($tableFooter);

  return $table;
}

function createDetailsHeader(div, id, selectedCheckboxes) {
  const detailsHeaderLeft = $("<div>").addClass("h6").text(`Bill ID: ${id}`);
  const detailsHeaderButton = $("<button>")
    .addClass("btn btn-primary")
    .text("REMOVE SELECTED EMPLOYEE")
    .click(function () {
      if (selectedCheckboxes.length === 0) {
        alert("Please select at least one employee");
        return;
      }
      if (!validateRemovingEmployees(selectedCheckboxes)) {
        return;
      }
      $(selectedCheckboxes).each(function (index, element) {
        $(`#${element}`).remove();
        removeEmps.push(element);
        selectedCheckboxes.length = 0;
        totalEmps -= 1;
      });
    });
  div.append(detailsHeaderLeft, detailsHeaderButton);
  return div;
}

function validateRemovingEmployees(idsToRemove) {
  const originalNet = frontendData["net"];
  const originalGross = frontendData["gross"];
  const originalDedn = frontendData["dedn"];

  let netRemaining = originalNet;
  let grossRemaining = originalGross;
  let dednRemaining = originalDedn;

  let canRemoveAll = true;
  $(idsToRemove).each(function (index, id) {
    const netVal = parseInt($(`#net-${id}`).text());
    const grossVal = parseInt($(`#gross-${id}`).text());
    const dednVal = parseInt($(`#dedn-${id}`).text());

    netRemaining -= netVal;
    grossRemaining -= grossVal;
    dednRemaining -= dednVal;
    if (netRemaining <= 0 || grossRemaining <= 0 || dednRemaining <= 0) {
      canRemoveAll = false;
      return false;
    }
  });

  if (!canRemoveAll) {
    alert("Cannot remove all employees.");
    return false;
  }

  frontendData["net"] = netRemaining;
  frontendData["gross"] = grossRemaining;
  frontendData["dedn"] = dednRemaining;

  updateFrontEndData();
  return true;
}

function createBillDetailsBill(row) {
  const container = createContainerFluid("bill-details-container");
  container.addClass("my-3 px-4");
  const table = $("<table>").addClass(
    "table table-bordered table-hover bill-details-table"
  );
  $.get("api/getDepartmentsAndScales.php", function (data) {
    const response = JSON.parse(data);
    if (response.status) {
      createBillDetailsRows(response, table, row);
    }
  });
  container.append(table);
  return container;
}

function createBillDetailsRows(response, table, row) {
  const rows = $("<tbody>");
  const keys = [
    "Select Scale Type",
    "FORM NO.",
    "Bill Type",
    "Select Bill ID",
    "Month",
    "Year",
    "Total No of Employees",
  ];

  const values = [
    createScaleTypeSelect(response.data.scales),
    "47",
    response.data.bill_type,
    createBillIdSelect(response.data.departments, row),
    createMonthSelect(),
    createYearSelect(),
    createTotalEmployeesCell(),
  ];
  keys.forEach((key, index) => {
    const row = $("<tr>");
    const keyCell = $("<td>").text(key);
    const valueCell = $("<td>").append(values[index]);
    row.append(keyCell, valueCell);
    rows.append(row);
  });

  table.append(rows);
}

function createTotalEmployeesCell() {
  return $("<div>").addClass("total-employees").text("");
}

function createScaleTypeSelect(scales) {
  const options = scales.map((scale) => ({
    value: scale.scale_type,
    text: scale.scale_type,
  }));
  return createSelect(options, "Select Scale Type", "selectscale");
}

function createBillIdSelect(departments, row) {
  const select = $("<select>", {
    class: "form-select",
    id: "billselect",
  });
  const selectOption = createSelectOption("", "Select");
  select.append(selectOption);

  departments.forEach(function (department) {
    const option = $("<option>", {
      value: department.department_id,
      text: department.department_name,
    });
    select.append(option);
  });
  select.on("change", function () {
    selectOption.remove();
  });
  updateTotalEmployees(select, departments, row);

  return select;
}

function updateTotalEmployees(select, departments, row) {
  select.on("change", function () {
    const selectedDepartmentId = $(this).val();
    const selectedDepartment = departments.find(
      (dep) => dep.department_id == selectedDepartmentId
    );
    if (selectedDepartment) {
      totalEmps = selectedDepartment.employee_count;
      const totalEmployeesDiv = $(".total-employees");
      totalEmployeesDiv.text(selectedDepartment.employee_count);
      $(".bill-employees-container").empty();
      $("#pay-bill-btn").remove();
      createDetailsBody(row, selectedDepartmentId);
    }
  });
}

function createMonthSelect() {
  const options = months.map((month) => ({
    value: Object.keys(month)[0],
    text: Object.values(month)[0],
  }));
  return createSelect(options, "Month", "selectmonth");
}

function createYearSelect() {
  const options = years.map((year) => ({
    value: year,
    text: year,
  }));
  return createSelect(options, "Year", "selectyear");
}

function createSelect(options, label, id) {
  const selectElement = $("<select>", {
    class: "form-select",
    id: id,
  });

  const labelElement = $("<label>").addClass("form-label").text(label);
  selectElement.append(labelElement);
  const selectOption = createSelectOption("", "Select");
  selectElement.append(selectOption);
  options.forEach((option) => {
    const optionElement = createSelectOption(option.value, option.text);
    selectElement.append(optionElement);
  });
  selectElement.on("change", function () {
    selectOption.remove();
  });
  return selectElement;
}

function createSelectOption(value, text) {
  return $("<option>", {
    value: value,
    text: text,
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
  let selectedFilesItems = new Set();
  const selectedFilesList = $("<ul>", {
    id: "selectedFilesList",
    class: "list-unstyled",
  });
  container.append(uploadDocsInput, selectedFilesList);

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
        selectedFilesItems.add(file);
        const listItem = $("<li>").addClass(
          "d-flex justify-content-between align-items-center"
        );

        const filenameSpan = $("<span>").text(file.name);

        const closeButton = $("<span class='close-button btn'>&times;</span>");
        closeButton.click(function () {
          selectedFiles.delete(file.name);
          selectedFilesItems.delete(file);
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
  const hiddenForm = $("<form>", {
    id: "hiddenUploadForm",
    method: "post",
    action: "uploadBillFiles.php",
    style: "display: none;",
    enctype: "multipart/form-data",
  });
  $(hiddenForm).submit(function (e) {
    e.preventDefault();
    selectedFilesItems.forEach(function (file) {
      sendFile(file);
    });
  });
  const hiddenInput = $("<input>", {
    type: "hidden",
    name: "id",
    id: "idInput",
  });
  const hiddenSubmitButton = $("<input>", {
    type: "submit",
    style: "display: none;",
    id: "hiddenSubmitBtn",
  });

  hiddenForm.append(hiddenInput, hiddenSubmitButton);
  $("body").append(hiddenForm);
  const uploadDocsGroup = $("<div>").addClass("input-group d-flex mb-3");
  uploadDocsGroup.append(uploadDocsLabel, container, uploadDocsButton);

  return uploadDocsGroup;
}

function sendFile(file) {
  const formData = new FormData();
  const request = new XMLHttpRequest();
  formData.append("files[]", file);
  formData.append("id", $("#idInput").val());
  formData.append("submit", "submit");
  request.open("POST", "api/uploadBillFiles.php");
  request.send(formData);
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
        window.location.replace("");
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

function flexDiv(classes, id) {
  return $("<div>", {
    class: `d-flex ${classes}`,
    id: id,
  });
}

function updateFrontEndData() {
  $("#total-gross").text(frontendData["gross"]);
  $("#total-dedn").text(frontendData["dedn"]);
  $("#total-net").text(frontendData["net"]);
}
