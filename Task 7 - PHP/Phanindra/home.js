$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (!userId) {
    window.location.replace("login.html");
  }
  var token = localStorage.getItem("token");

  $.post("api/getuser.php", { token: token }, function (result) {
    var result = JSON.parse(result);

    if (!result.status) {
      alert(result.message);
    } else {
      $("#welcomeMsg").text(result.message);

      let getTableData = function (tableName, searchQuery = "") {
        $.get(
          `http://localhost/task-6/api/data.php`,
          { tableName: tableName, search: searchQuery },
          function (tableData) {
            var tableData = JSON.parse(tableData);
            //     console.log(tableData);
            $("#tableContainer").empty();

            let displayColumns = [];

            if (tableName === "employees") {
              displayColumns = ["employeeid", "firstname", "lastname", "email"];
            }

            $("#tableContainer").append(`
              <table class="table table-hover table-bordered border border-dark text-center">
                <thead class="tableHead bg-primary bg-opacity-25 text-dark">
                  <tr></tr>
                </thead>
                <tbody class="tableRow">
                </tbody>
              </table>`);

            //  console.log(tableData.data[0]);
            //  console.log(tableData["data"][0]);

            for (let each in tableData["data"][0]) {
              //  console.log(each);

              if (displayColumns.includes(each)) {
                $(".tableHead tr").append(
                  `<th>${each.toLocaleUpperCase()}</th>`
                );
              } else if (tableName !== "employees") {
                $(".tableHead tr").append(
                  `<th>${each.toLocaleUpperCase()}</th>`
                );
              }
            }
            if (tableName === "employees") {
              $(".tableHead tr").append(`<th>MORE DETAILS</th>`);
              $(".tableHead tr").append(`<th>ACTION</th>`);
              $(".tableHead tr").append(`<th>ACTION</th>`);
            }

            for (
              let rowIndex = 0;
              rowIndex < tableData.data.length;
              rowIndex++
            ) {
              const each = tableData.data[rowIndex];
              //  console.log(each);
              var row = "";
              if (tableName === "employees") {
                for (let i in each) {
                  if (displayColumns.includes(i)) {
                    row += `<td>${each[i]}</td>`;
                  }
                }
              } else {
                for (let i in each) {
                  row += `<td>${each[i]}</td>`;
                }
              }

              if (tableName === "employees") {
                row += `<td>
   
                <!-- Button trigger modal -->
            <button type="button" style="font-size:12px;" class="btn btn-secondary viewMoreBtn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
            View more
            </button>
            
            <!-- Modal -->
            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content text-light" style="background-color: #353535;">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">More Employee Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div id="moredetailsContainer"></div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
            </div>
             
            </td>`;

                row += `<td>
                <i style="cursor:pointer;" class="fa-solid fa-trash text-danger deleteBtn" data-rowindex= "${rowIndex}" ></i>
                </td>`;

                row += `<td>
                <button  type="button" style="cursor:pointer;" class= "updateBtn btn btn-secondary">Update</button>
                </td>`;
              }

              $(".tableRow").append(
                `<tr class="bg-info bg-opacity-10 text-dark">${row}</tr>`
              );
            }

            //<i style="cursor:pointer;" class="fa-solid fa-user-pen text-warning updateBtn">

            $(".tableRow").on("click", ".viewMoreBtn", function () {
              const rowIndex = $(this).closest("tr").index();
              const employeedData = tableData.data[rowIndex];

              //   console.log(employeedData);

              const detailsHtml = `
               <p>Contact number : ${employeedData.contactnumber} </p>  
                <p>Gender : ${employeedData.gender} </p>  
                <p>Bench status : ${employeedData.benchstatus} </p>
                <p>Role name : ${employeedData.rolename} </p>
              `;
              $("#moredetailsContainer").html(detailsHtml);
            });

            $(".tableRow").on("click", ".deleteBtn", function () {
              const rowIndex = $(this).data("rowindex");

              if (confirm("Are you sure you want to delete this employee?")) {
                const employeeData = tableData.data[rowIndex];

                console.log(employeeData);

                $.post(
                  "http://localhost/task-6/api/deleteemployee.php",
                  { employeeId: employeeData.employeeid },
                  function (result) {
                    var parsedResult = JSON.parse(result);
                    // console.log(parsedResult);

                    if (parsedResult.status) {
                      $(".tableRow").eq(rowIndex).remove();
                      getTableData("employees");
                    } else {
                      alert("Failed to delete employee.");
                    }
                  }
                );
              }
            });

            //update

            $(".tableRow").on("click", ".updateBtn", function () {
              // Check if the button text is "Update"
              if ($(this).text() === "Update") {
                // Log "Update" text
                console.log("Update");

                const $row = $(this).closest("tr");

                const columnIndexFirstname = 1;
                const columnIndexLasttname = 2;
                const columnIndexEmail = 3;

                const $editableCells = $row.find(
                  "td:eq(" +
                    columnIndexFirstname +
                    "),td:eq(" +
                    columnIndexLasttname +
                    "),td:eq(" +
                    columnIndexEmail +
                    ")"
                );

                // Iterate through the editable cells to replace their content with input fields
                $editableCells.each(function () {
                  const $cell = $(this);
                  const currentValue = $cell.text();

                  // Replace the content with an input field containing the current value
                  $cell.html(
                    `<input type="text" class="form-control" value="${currentValue}">`
                  );
                });

                // Change the button text and class to "Save" and "btn-success"
                $(this)
                  .text("Save")
                  .removeClass("btn-secondary")
                  .addClass("btn-success");

                // Disable the "Edit" button while editing
                // $(this).attr("disabled", true);
              }
            });

            // Save button click handler
            $(".tableRow").on("click", ".updateBtn.btn-success", function () {
              console.log("Save");

              const $row = $(this).closest("tr");
              const $editableInputs = $row.find("input[type='text']");

              const updatedData = {};

              $editableInputs.each(function () {
                const $input = $(this);
                
                const columnIndex = $input.closest("td").index();

                switch(columnIndex){
                  case 1:
                    updatedData.firstname=$input.val();
                    break;
                  case 2:
                    updatedData.lastname=$input.val();
                    break;
                  case 3:
                    updatedData.email=$input.val();
                    break;
                    default:
                      break;
                }

              }); 
              
              console.log(updatedData);

             const $saveBtn =$(this);

              $.post(
                "http://localhost/Task-6/api/updatedata.php",
                { updatedData: updatedData },
                
                function (result) {
                  const parsedResult = JSON.parse(result);
                  console.log(parsedResult);

                  if (parsedResult.status) {
                    $editableInputs.each(function () {
                      const $input = $(this);
                      const newlValue = $input.val();

                      $input.closest("td").text(newlValue);
                    });

                    $editableInputs.prop("disabled", true);

                    $saveBtn
                      .text("Update")
                      .removeClass("btn-success")
                      .addClass("btn-secondary");
                  } else {
                    console.error("Failed to save data.");
                  }
                }
               
              );
            });


          }
        );

        let searchTimeout;
        $(".searchInput").on("input", function () {
          clearTimeout(searchTimeout);
          const searchQuery = $(this).val();
          searchTimeout = setTimeout(() => {
            getTableData(tableName, searchQuery);
          }, 1000);
        });
      };

      $(".employees").click(function () {
        getTableData("employees");
      });
      $("#projects").click(function () {
        getTableData("projects");
      });
      $("#roles").click(function () {
        getTableData("roles");
      });
      $("#salaries").click(function () {
        getTableData("salaries");
      });
      $("#attendance").click(function () {
        getTableData("attendance");
      });
      $("#employeeprojects").click(function () {
        getTableData("employeeprojects");
      });

      $(".employees").trigger("click");

      $("#logoutBtn").click(function () {
        localStorage.removeItem("token");
        window.location.href = "register.html";
      });
    }
  });

  // ... Validation functions ...

  $("#addBtn").click(function () {
    var firstname = $("#firstnameInput").val();
    var lastname = $("#lastnameInput").val();
    var number = $("#numberInput").val();
    var email = $("#emailInput").val();

    var gender = $("input[name='gender']:checked").val();

    var benchStatus = $("#benchStatus").val();
    var roleid = $("#role").val();

    // ... Validation calls ...

    $.post(
      "http://localhost/task-6/api/modaldata.php",
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        number: number,
        gender: gender,
        benchStatus: benchStatus,
        roleid: roleid,
      },
      function (result) {
        var parsedResult = JSON.parse(result);
        var trimmedResult = result.trim();
        var parsedResult = JSON.parse(trimmedResult);

        //  console.log(parsedResult);
        if (!parsedResult.status) {
          alert(parsedResult.message);
        } else {
          $("#modaldataMsg").text(parsedResult.message);

          var newEmployeeId = parsedResult.employeeid;
          //  console.log(newEmployeeId);

          var newRow = '<tr class="bg-info bg-opacity-10 text-dark">';
          newRow += "<td>" + newEmployeeId + "</td>";
          newRow += "<td>" + firstname + "</td>";
          newRow += "<td>" + lastname + "</td>";
          newRow += "<td>" + email + "</td>";
          newRow += "<td>" + number + "</td>";
          newRow += "<td>" + gender + "</td>";
          newRow += "<td>" + benchStatus + "</td>";
          newRow += "<td>" + roleid + "</td>";
          newRow +=
            '<td><button type="button" class="btn btn-secondary viewMoreBtn" data-bs-toggle="modal" data-bs-target="#exampleModal2">View more</button></td>';
          newRow +=
            '<td><i style="cursor:pointer;" class="fa-solid fa-trash text-danger deleteBtn"></i></td>';
          newRow += "</tr>";

          $(".tableRow").append(newRow);

          $("#firstnameInput").val("");
          $("#lastnameInput").val("");
          $("#emailInput").val("");
          $("#numberInput").val("");
          $("input[name='gender']").prop("checked", false);
          $("#benchStatus").val("");
          $("#role").val("");
        }
      }
    );
  });
});

/*

for (let rowIndex = 0; rowIndex < tableData.data.length; rowIndex++) {
  const each = tableData.data[rowIndex];
  var row = "";

  for (let i in each) {
    row += `<td>${each[i]}</td>`;
  }

  if (tableName === "employees") {
    row += `<td>
      <button type="button" class="btn btn-secondary viewMoreBtn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        View more
      </button>
      <!-- ... -->
    </td>`;
    row += `<td><i style="cursor:pointer;" class="fa-solid fa-trash text-danger deleteBtn" data-rowindex="${rowIndex}"></i></td>`;
  }

  $(".tableRow").append(`<tr class="bg-info bg-opacity-10 text-dark">${row}</tr>`);
}

 
for (let each of tableData.data) {
  var row = "";
 
  for (let i in each) {
    row += `<td>${each[i]}</td>`;              
  }

  if (tableName === "employees") {
    row += `<td>
   
    <!-- Button trigger modal -->
<button type="button" class="btn btn-secondary viewMoreBtn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
View more
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h1 class="modal-title fs-5" id="exampleModalLabel">More Employee Details :</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<div id="moredetailsContainer"></div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>
 
</td>`;      
     row+=`<td><i style="cursor:pointer;" class="fa-solid fa-trash text-danger" id="deleteBtn" data-rowindex="${rowIndex}></i></td>`
   
  }
  $(".tableRow").append(`<tr class="bg-info bg-opacity-10 text-dark">${row}</tr>`); 


}
*/
