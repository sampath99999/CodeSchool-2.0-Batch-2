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
    console.log(result);
    try {
      console.log(result);
      var resultObj = JSON.parse(result.trim());
      console.log(result);
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
    $.get("api/getcompanies.php", function (result) {
      console.log(result);
      var result = JSON.parse(result);
      console.log(result);
      $("#addtable").empty();
      $("#addtable").append(`<div class="table-responsive"><table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">company_name</th>
                <th scope="col">company_location</th>
                <th scope="col">city</th>
                <th scope="col">country</th>
              </tr>
            </thead>
            <tbody id="addrow"></tbody></table></div>`);
      for (let row of result) {
        console.log(row);
        const { id, company_name, company_location, city, country } = row;
        console.log(`${id}`);
        $("#addrow")
          .append(`<tr><td>${id}</td><td>${company_name}</td><td>${company_location}</td>
                <td>${city}</td><td>${country}</td></tr>`);
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("An error occurred:", errorThrown);
    });
  });

  $("#employeelist").click(function () {
    $(this).css("background-color", "#6495ed");
    $("#companylist").css("background-color", "#08254f");
    $("#salarylist").css("background-color", "#08254f");
    $.get("api/getemployees.php", function (result) {
      var result = JSON.parse(result);
      console.log(result);
      $("#addtable").empty();
      $("#addtable").append(`<div class="table-responsive"><table class="table">
           <thead>
             <tr>
               <th scope="col">id</th>
               <th scope="col">employee_name</th>
               <th scope="col">company_id</th>
               <th scope="col">employee_role</th>
               <th scope="col">employee_phno</th>
               <th scope="col">permanant_address</th>
               <th scope="col">residential_address</th>
               <th scope="col">leaves_per_month</th>
               <th scope="col">salary_per_annum</th>
             </tr>
           </thead>
           <tbody id="addrow"></tbody></table></div>`);
      for (let row of result) {
        console.log(row);
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
        console.log(`${id}`);
        $("#addrow")
          .append(`<tr><td>${id}</td><td>${employee_name}</td><td>${company_id}</td>
               <td>${employee_role}</td><td>${employee_phno}</td><td>${permanant_address}</td><td>${residential_address}</td><td>${leaves_per_month}</td><td>${salary_per_annum}</td></tr>`);
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("An error occurred:", errorThrown);
    });
  });

  $("#salarylist").click(function () {
    $(this).css("background-color", "#6495ed");
    $("#companylist").css("background-color", "#08254f");
    $("#employeelist").css("background-color", "#08254f");
    $.get("api/getsalarydetails.php", function (result) {
      var result = JSON.parse(result);
      console.log(result);
      $("#addtable").empty();
      $("#addtable").append(`<div class="table-responsive"><table class="table">
       <thead>
         <tr>
           <th scope="col">id</th>
           <th scope="col">employee_id</th>
           <th scope="col">no_of_leaves</th>
           <th scope="col">salary_date</th>
           <th scope="col">salary_per_month</th>
           <th scope="col">employee_name</th>
           <th scope="col">company_name</th>
         </tr>
       </thead>
       <tbody id="addrow"></tbody></table></div>`);
      for (let row of result) {
        console.log(row);
        const {
          id,
          employee_id,
          company_id,
          no_of_leaves,
          salary_date,
          salary_per_month,
          employee_name,
          company_name,
        } = row;
        console.log(`${id}`);
        $("#addrow")
          .append(`<tr><td>${id}</td><td>${employee_id}</td><td>${no_of_leaves}</td>
           <td>${salary_date}</td><td>${salary_per_month}</td><td>${employee_name}</td><td>${company_name}</td></tr>`);
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error("An error occurred:", errorThrown);
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
});
