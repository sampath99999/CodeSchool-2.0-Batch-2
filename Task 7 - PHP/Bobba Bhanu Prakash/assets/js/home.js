$(document).ready(function () {
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

  setTimeout(function () {
    var token = localStorage.getItem("token");
    $.post("api/sessionout.php", { token: token }, function (result) {}).fail(
      function (jqXHR, textStatus, errorThrown) {
        console.error("An error occurred:", errorThrown);
      }
    );
    localStorage.removeItem("token");
    alert("session timed out");
    window.location.replace("login.html");
  }, 600000);
  var userId = localStorage.getItem("token");
  if (!userId) {
    window.location.replace("login.html");
  }
  var token = localStorage.getItem("token");
  $.post("api/getuser.php", { token: token }, function (result) {
    try {
      var resultObj = JSON.parse(result.trim());
      if (!resultObj.status) {
        alert(resultObj.message);
      } else {
        $("#welcomeMsg").text(resultObj.data);
        $("#userEmail").text("(" + resultObj.message + ")");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("An error occurred:", errorThrown);
  });

  $("#companylist").click(function () {
    $(this).css("background-color", "#6495ed");
    $("#employeelist").css("background-color", "#08254f");
    $("#salarylist").css("background-color", "#08254f");
    var token = localStorage.getItem("token");
    $.post("api/getcompanies.php", { token: token }, function (result) {
      var result = JSON.parse(result);
      var serialNum = 0;
      $("#addtable").empty();
      $(
        "#addtable"
      ).append(`<h3 class="text-center bolder">Company Details</h3><br/><div class="table-responsive"><table class="table">
            <thead>
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col">NAME</th>
                <th scope="col">LOCATION</th>
                <th scope="col">CITY</th>
                <th scope="col">COUNTRY</th>
              </tr>
            </thead>
            <tbody id="addrow"></tbody></table></div>`);
      for (let row of result) {
        serialNum++;
        const { id, company_name, company_location, city, country } = row;
        $("#addrow").append(
          `<tr><td>` +
            serialNum +
            `</td><td>${company_name}</td><td>${company_location}</td>
                <td>${city}</td><td>${country}</td></tr>`
        );
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("An error occurred:", errorThrown);
    });
  });

  $("#employeelist").click(function () {
    $(this).css("background-color", "#6495ed");
    $("#companylist").css("background-color", "#08254f");
    $("#salarylist").css("background-color", "#08254f");
    var token = localStorage.getItem("token");
    $.post("api/getemployees.php", { token: token }, function (result) {
      var result = JSON.parse(result);
      var serialNum = 0;
      $("#addtable").empty();
      $(
        "#addtable"
      ).append(`<h3 class="text-center">Employee Details</h3><br/><div class="table-responsive"><table class="table">
           <thead>
             <tr>
               <th scope="col">S.NO</th>
               <th scope="col">NAME</th>
               <th scope="col">ROLE</th>
               <th scope="col">PHONE NUMBER</th>
               <th scope="col">PERMANANT ADDRESS</th>
               <th scope="col">RESIDENTIAL ADDRESS</th>
               <th scope="col">LEAVES ALLOWED</th>
               <th scope="col">SALARY</th>
             </tr>
           </thead>
           <tbody id="addrow"></tbody></table></div>`);
      for (let row of result) {
        const {
          id,
          employee_name,
          company_id,
          employee_role,
          employee_phno,
          permanant_address,
          residential_address,
          leaves_per_month,
          salary_per_annum,
        } = row;
        serialNum++;
        $("#addrow").append(
          `<tr><td>` +
            serialNum +
            `</td><td>${employee_name}</td>
               <td>${employee_role}</td><td>${employee_phno}</td><td>${permanant_address}</td><td>${residential_address}</td><td>${leaves_per_month}</td><td>${salary_per_annum}</td></tr>`
        );
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("An error occurred:", errorThrown);
    });
  });

  $("#salarylist").click(function () {
    $(this).css("background-color", "#6495ed");
    $("#companylist").css("background-color", "#08254f");
    $("#employeelist").css("background-color", "#08254f");
    var token = localStorage.getItem("token");
    $.post("api/getsalarydetails.php", { token: token }, function (result) {
      var result = JSON.parse(result);
      var serialNum = 0;
      $("#addtable").empty();
      $("#addtable").append(`<h3 class="text-center">Salary Details</h3><br/>
      <div class="form-control d-flex searchBox">
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path fill="currentColor"
               d="M20.031 20.79c.46.46 1.17-.25.71-.7l-3.75-3.76a7.904 7.904 0 0 0 2.04-5.31c0-4.39-3.57-7.96-7.96-7.96s-7.96 3.57-7.96 7.96c0 4.39 3.57 7.96 7.96 7.96c1.98 0 3.81-.73 5.21-1.94l3.75 3.75zM4.11 11.02c0-3.84 3.13-6.96 6.96-6.96c3.84 0 6.96 3.12 6.96 6.96s-3.12 6.96-6.96 6.96c-3.83 0-6.96-3.12-6.96-6.96z" />
        </svg>
        <input type="text"
          class="border-0"
          id="searchinput"
          placeholder=""
        />
      </div>
      <div class="table-responsive"><table class="table">
       <thead>
         <tr>
         <th scope="col"></th>
           <th scope="col">S.NO</th>
           <th scope="col">EMPLOYEE CODE</th>
           <th scope="col">LEAVES TAKEN</th>
           <th scope="col">OVERTIME</th>
           <th scope="col">SALARY DATE</th>
           <th scope="col">AMOUNT</th>
           <th scope="col">EMPLOYEE NAME</th>
           <th scope="col">COMPANY NAME</th>
           <th scope="col"></th>
           <th scope="col"></th>
         </tr>
       </thead>
       <tbody id="addrow"></tbody></table></div>
       <div class="d-flex float-end gap-2">
       <div class="btn bg-danger text-white rounded-2" id="deletesalaryBtn">delete</div>
       <div class="btn bg-primary text-white rounded-2" id="addSalaryBtn">Add Salary</div>
       </div>
       `);
      for (let row of result) {
        const {
          id,
          employee_id,
          company_id,
          no_of_leaves,
          salary_date,
          salary_per_month,
          employee_name,
          company_name,
          overtime_in_hours,
        } = row;
        var btnid = btoa(`${id}`);
        var editBtnId = btoa("view" + `${id}`);
        serialNum++;
        $("#addrow").append(
          `<tr><td><input class="form-check-input border-1 border-secondary" type="checkbox" value="` +
            btnid +
            `" name="checkboxDelete"></td><td>` +
            serialNum +
            `</td><td>${employee_id}</td><td>${no_of_leaves}</td><td>${overtime_in_hours}</td>
           <td>${salary_date}</td><td>${salary_per_month}</td><td>${employee_name}</td><td>${company_name}</td>
           <td>
           <button
        type="button"
        class="btn btn-primary viewBtn"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        id="` +
            btnid +
            `"
      >
        view
      </button>

      <!-- Large Modal -->
      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <!-- Added modal-lg class -->
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel"></h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeBtn"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="modalBody">
              
            </div>
            <div class="modal-footer">
            <button
            type="button"
            class="btn btn-primary printBtn"
            >
            print
            </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
         </td><td><div class="btn rounded-2 text-white bg-success editBtn" id="` +
            editBtnId +
            `">edit</div></td></tr>`
        );
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("An error occurred:", errorThrown);
    });
  });

  $(document).on("keyup", "#searchinput", function () {
    var searchinput = $(this).val().toLowerCase();
    $("#addrow > tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchinput) > -1);
    });
  });

  $("#logoutBtn").click(function () {
    var token = localStorage.getItem("token");
    $.post("api/sessionout.php", { token: token }, function (result) {}).fail(
      function (jqXHR, textStatus, errorThrown) {
        console.error("An error occurred:", errorThrown);
      }
    );
    localStorage.removeItem("token");
    window.location.replace("login.html");
  });
  $(document).on("click", ".viewBtn", function () {
    var id = $(this).attr("id");
    id = atob(id);
    $.post("api/getviewsalaries.php", { id: id }, function (result) {
      result = JSON.parse(result);
      const {
        salary_per_month,
        overtime_pay,
        leaves_deduction,
        basic_pay,
        allowances,
        performance_bonus,
        benifits,
        income_tax,
        insurances,
        provident_fund,
        employee_name,
        company_name,
        salary_date,
      } = result[0];
      $("#modalLabel").html(`<p>Employee Name : ${employee_name}</p>
      <p>Company Name : ${company_name}</p>
      <p>Salary Date : ${salary_date}</p>
      `);
      $("#modalBody").empty();
      $("#modalBody").append(`<div col-12 offest-md-2 col-md-8 offset-md-2>
      <div class="row">
      <div class="col-6">
      <h3>Earnings</h3><br/>
      <div class="row">
       <div class="col-5">
       <p>Basic Pay</p>
       </div>
       <div class="col-7">
       <p>: ${basic_pay}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
       <p>Allowances</p>
       </div>
       <div class="col-7">
       <p>: ${allowances}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
       <p>Performance Bonus</p>
       </div>
       <div class="col-7">
       <p>: ${performance_bonus}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
       <p>Benefits</p>
       </div>
       <div class="col-7">
       <p>: ${benifits}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
       <p> Overtime Pay</p>
       </div>
       <div class="col-7">
       <p>: ${overtime_pay}</p>
       </div>
      </div>
      </div>
      <div class="col-6">
      <h3>Deductions</h3></br>
      <div class="row">
       <div class="col-5">
       <p>Leaves Deduction</p>
       </div>
       <div class="col-7">
       <p>: ${leaves_deduction}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
       <p>Income Tax</p>
       </div>
       <div class="col-7">
       <p>: ${income_tax}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
       <p>Insurance</p>
       </div>
       <div class="col-7">
       <p>: ${insurances}</p>
       </div>
      </div>
      <div class="row">
       <div class="col-5">
        <p>Provident Fund</p>
       </div>
       <div class="col-7">
        <p>: ${provident_fund}</p>
       </div>
      </div>
      </div>
      </div>
      <div class="row">
      <div class="col-6">
      <div class="row bg-primary bg-opacity-50 text-white">
       <div class="col-5">
       <p><h5>Gross Salary</h5></p>
       </div>
       <div class="col-7">
       <p><h5>: ${
         benifits + basic_pay + allowances + performance_bonus + overtime_pay
       }</h5></p>
       </div>
      </div>
      </div>
      <div class="col-6">
      <div class="row bg-danger bg-opacity-50 text-white">
       <div class="col-5">
       <p><h5>Total Deductions</h5></p>
       </div>
       <div class="col-7">
       <p><h5>: ${
         income_tax + insurances + leaves_deduction + provident_fund
       }</h5></p>
       </div>
      </div>
      </div>
      </div>
      <br/>
      <div class="row bg-success bg-opacity-50 text-white">
       <div class="d-flex offset-5 col-3 p-2">
       <p><h4>Net Salary</h4></p>
       <p><h4 class="ms-2">  :  ${salary_per_month}</h4></p>
       </div>
      </div>`);
    });
  });
  $(document).on("click", ".printBtn", function () {
    window.print();
  });

  $(document).on("click", "#deletesalaryBtn", function () {
    var checkIds = [];
    $("input:checkbox[name='checkboxDelete']:checked").each(function () {
      var id = $(this).attr("value");
      id = atob(id);
      checkIds.push(id);
    });
    if (checkIds.length == 0) {
      alert("please select rows");
    } else {
      checkIds = JSON.stringify(checkIds);
      $.post(
        "api/deletesalaries.php",
        { checkIds: checkIds },
        function (result) {
          var result = JSON.parse(result);
          alert(result["message"]);
          if (result["status"]) {
            window.location.reload("home.html");
            $("#salarylist").click();
          }
        }
      );
    }
  });

  $.post(
    "api/getsalarydetailsinsert.php",
    { token: token },
    function (response) {
      var response = JSON.parse(response);
      var keys = Object.keys(response);

      function addForm(btnname, btnid) {
        var btnName = btnname;
        var btnId = btnid;
        $("#addtable").empty();
        $("#addtable").append(`<div class="offset-3 col-5">
  <div class="card">
  <div class="card-title">
  <h3 class="text-center" id="cardHeading"><h3>
  </div>
  <div class="card-body">
  <label class="me-2 my-3">Company Name</label><select class="form-select" id="companyName"></select>
  <div id="companyErr" class="text-danger"></div>
  <label class="me-2 my-3">Employee ID</label><select class="form-select" id="employeeId"></select>
  <div class="text-danger mb-3" id="employeeErr" class="text-danger"></div>
  <div class="form-floating mb-3">
  <input type="text" class="form-control" id="employeeName" placeholder="" readonly>
  <label for="employeeName">Employee Name</label>
  </div>
  <div class="form-floating">
  <input type="number" class="form-control" id="noOfLeaves" placeholder="">
  <label for="noOfLeaves">number of Leaves</label>
  </div>
  <div class="text-danger mb-3" id="noOfLeavesErr"></div>
  <div class="form-floating">
  <input type="number" class="form-control" id="overtime" placeholder="in hours">
  <label for="overtime">overtime</label>
  </div>
  <div class="text-danger mb-3" id="overtimeErr"></div>
  <div class="form-floating">
  <input type="date" class="form-control" id="salaryDate" placeholder="">
  <label for="salaryDate">Salary Date</label>
  </div>
  <div class="text-danger mb-3" id="salaryDateErr"></div>
  <div id="addButton"></div></div>
  </div>
  </div>`);
        if (btnName == "add") {
          $("#cardHeading").append(`ADD SALARY`);
          $("#addButton").append(
            `<div class="btn bg-success text-white float-end" id="` +
              btnId +
              `">add</div>`
          );
        } else {
          $("#cardHeading").append(`UPDATE SALARY`);
          btnId = btoa(btnId);
          $("#addButton").append(
            `<div class="btn bg-success text-white float-end updateBtn" id="` +
              btnId +
              `">update</div>`
          );
        }
        $("#companyName").append(`<option value="">select</option>`);
        for (let i of keys) {
          $("#companyName").append(
            `<option value='` + i + `'>` + i + `</option>`
          );
        }
        $("#employeeId").append(`<option value="">select</option>`);
      }

      $(document).on("click", "#addSalaryBtn", function () {
        addForm("add", "addBtn");
      });
      $(document).on("click", ".editBtn", function () {
        var id = $(this).attr("id");
        id = atob(id);
        id = id.substr(4, 6);
        id = parseInt(id);
        var btnId = "edit" + id;
        addForm("update", btnId);
        $.post("api/getsalarydetailsupdate.php", { id: id }, function (result) {
          var result = JSON.parse(result);
          const {
            employee_id,
            no_of_leaves,
            salary_date,
            overtime_in_hours,
            employee_name,
            company_name,
          } = result[0];
          $("#companyName").val(`${company_name}`);
          $("#companyName").change();
          $("#employeeId").val(`${employee_id}`);
          $("#employeeName").val(`${employee_name}`);
          $("#employeeName").focus();
          $("#noOfLeaves").val(`${no_of_leaves}`);
          $("#overtime").val(`${overtime_in_hours}`);
          $("#salaryDate").val(`${salary_date}`);
        });
      });

      $(document).on("change", "#companyName", function () {
        var companyName = $("#companyName").val();
        for (let i of keys) {
          if (companyName == i) {
            var values = response[i];
            $("#employeeId").empty();
            $("#employeeId").append(`<option value=''>select</option>`);
            for (let j of values) {
              $("#employeeId").append(
                `<option value='` + j.id + `'>` + j.id + `</option>`
              );
            }
            break;
          }
        }
      });

      $(document).on("change", "#employeeId", function () {
        var companyName = $("#companyName").val();
        var employeeId = $("#employeeId").val();
        for (let i of keys) {
          if (companyName == i) {
            var values = response[i];
            for (let j of values) {
              if (j.id == employeeId) {
                $("#employeeName").val(j.employee_name);
                $("#employeeName").focus();
                break;
              }
            }
            break;
          }
        }
      });

      function validateForm(btnType) {
        var btnValue = btnType;
        var flag = true;
        var salaryInsertObj = {
          companyName: $("#companyName").val(),
          employeeId: $("#employeeId").val(),
          employeeName: $("#employeeName").val(),
          noOfLeaves: $("#noOfLeaves").val(),
          overtime: $("#overtime").val(),
          salaryDate: $("#salaryDate").val(),
          token: token,
        };
        var dateInput = new Date(salaryInsertObj.salaryDate);
        var currentDate = new Date();
        var dateInputWithoutTime = new Date(
          dateInput.getFullYear(),
          dateInput.getMonth(),
          dateInput.getDate()
        );
        var currentDateWithoutTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getMonth()
        );
        if (salaryInsertObj.companyName.length == 0) {
          $("#companyErr").empty();
          $("#companyErr").append(`please select company name`);
          flag = false;
        } else {
          $("#companyErr").empty();
        }
        if (salaryInsertObj.employeeId.length == 0) {
          $("#employeeErr").empty();
          $("#employeeErr").append(`please select employee id`);
          flag = false;
        } else {
          $("#employeeErr").empty();
        }
        if (
          salaryInsertObj.noOfLeaves < 0 ||
          salaryInsertObj.noOfLeaves.length == 0
        ) {
          $("#noOfLeavesErr").empty();
          $("#noOfLeavesErr").append(`please enter proper noOfLeaves`);
          flag = false;
        } else {
          $("#noOFLeavesErr").empty();
        }
        if (
          salaryInsertObj.overtime < 0 ||
          salaryInsertObj.overtime.length == 0
        ) {
          $("#overtimeErr").empty();
          $("#overtimeErr").append(`please enter proper overtime`);
          flag = false;
        } else {
          $("#overtimeErr").empty();
        }
        if (salaryInsertObj.salaryDate.length == 0) {
          $("#salaryDateErr").empty();
          $("#salaryDateErr").append(`please select date`);
          flag = false;
        } else if (dateInputWithoutTime > currentDateWithoutTime) {
          $("#salaryDateErr").empty();
          $("#salaryDateErr").append(`Don't enter future date`);
          flag = false;
        } else {
          $("#salaryDateErr").empty();
        }
        if (flag) {
          if (btnValue == "add") {
            $.post(
              "api/insertsalaries.php",
              salaryInsertObj,
              function (result) {
                var result = JSON.parse(result);
                alert(result["message"]);
                if (result["status"]) {
                  $("#salarylist").click();
                }
              }
            );
          } else {
            var btnid = parseInt(btnValue);
            salaryInsertObj.id = btnid;
            $.post(
              "api/updatesalaries.php",
              salaryInsertObj,
              function (result) {
                var result = JSON.parse(result);
                alert(result["message"]);
                if (result["status"]) {
                  $("#salarylist").click();
                }
              }
            );
          }
        }
      }

      $(document).on("click", "#addBtn", function () {
        validateForm("add");
      });
      $(document).on("click", ".updateBtn", function () {
        var id = $(this).attr("id");
        id = atob(id);
        id = id.substr(4, 6);
        validateForm(id);
      });
    }
  );
});
