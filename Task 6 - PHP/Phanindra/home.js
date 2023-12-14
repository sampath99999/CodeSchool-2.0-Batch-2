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

      let getTableData = function (tableName) {
        //  $(".homeCont").empty();
        $.get(
          "http://localhost/task-6/api/data.php",
          { tableName: tableName },
          function (tableData) {
            var tableData = JSON.parse(tableData);
            $("#tableContainer").empty();

            $("#tableContainer")
              .append(`<table class="table table-hover table-bordered border border-dark text-center">
                <thead class= "tableHead bg-primary bg-opacity-25 text-dark">
                  <tr>
                    
                  </tr>
                </thead>
                <tbody class = "tableRow">
                </tbody>
              </table>`);
            for (let each in tableData["data"][0]) {
              $(".tableHead").append(`<th> ${each.toLocaleUpperCase()} </th>`);
            }
            for (let each of tableData.data) {
              $(".tableRow").append(
                `<tr class ="bg-info bg-opacity-10 text-dark"> ${row} </tr>`
              );
              var row = "";
              for (let i in each) {
                row += `<td> ${each[i]} </td>`;
              }
            }
          }
        );
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

      $("#logoutBtn").click(function () {
        localStorage.removeItem("token");
        window.location.href = "register.html";
      });
    }
  });
});
