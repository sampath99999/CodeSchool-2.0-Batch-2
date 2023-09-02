$(document).ready(function () {
  var userToken = localStorage.getItem("access_token");
  if (!userToken) {
    window.location.href = "login.html";
  }
  var result = [];
  $("#hosHead").css({ fontSize: "15px" });

  $(".hospitalLogo").css({
    height: "25px",
    width: "25px",
    borderRadius: "50%",
  });
  var background = [
    "bg-success",
    "bg-secondary",
    "bg-info",
    "bg-primary",
    "bg-warning",
  ];
  var randBg = Math.floor(Math.random() * background.length);
  var randomBackground = background[randBg];

  $.get("http://localhost/programs/apiconfig/getnavbar.php", {
    userToken: userToken,
  })
    .done(function (result) {
      var result = JSON.parse(result);
      $(".userEl").append(
        `<span class = "m-0 userName"> ${result.user_name} </span>`
      );
      for (let each in result.data) {
        $("#navEl").append(`<li class="nav-item">
        <a
          class="tableName nav-link active text-light"
          aria-current="page"
          href="#"
          id = ${result.data[each]}
        >
        ${result.data[each].toUpperCase()}
        
        </a
        >
      </li>`);
      }
      $(".bottomCont").append(
        `<div class = "homeCont d-flex align-items-center"> <div class = "descCont"> <h1 class = "descHead"> Making Health Care Better Together </h1> <p class = "descPara"> A hospital manager, also referred to as a hospital administrator, plays a crucial role in managing the hospital's day-to-day operations. They oversee daily work processes, devise departmental strategies, manage the infrastructure and employees and plan the finances and budget of the facility </p> <h4 class = "head"> Welcome ${result.user_name}... </h4> </div> <div class = "imageCont"><img src="https://www.yanchepcentraldental.com.au/wp-content/uploads/2021/12/doctor-image-5b5ec4258d17f2.3977554915329372535779.png" alt="-doctor-image" class = "doctorImage"> </div> </div>`
      );

      let getTableData = function (tableName) {
        $(".homeCont").empty();
        $.get(
          "http://localhost/programs/apiconfig/tabledata.php",
          { tableName: tableName },
          function (tableData) {
            var tableData = JSON.parse(tableData);
            $(".tableContainer").empty();
            $(".tableContainer")
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

      $("#hospitals").click(function () {
        getTableData("hospitals");
      });
      $("#doctors").click(function () {
        getTableData("doctors");
      });
      $("#patients").click(function () {
        getTableData("patients");
      });
      $("#register").click(function () {
        getTableData("register");
      });
      $("#appointments").click(function () {
        getTableData("appointments");
      });
    })
    .fail(function (result) {
      console.log(result.message);
    });
  $(".userName").css({ fontSize: "12px" });
  $(".head").css({ fontStyle: "italic" });
  $("#logoutBtn").click(function () {
    localStorage.removeItem("access_token");
    window.location.href = "register.html";
  });
});
