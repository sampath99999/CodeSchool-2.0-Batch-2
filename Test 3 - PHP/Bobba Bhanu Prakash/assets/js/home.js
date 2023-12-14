$(document).ready(function () {
  var token = localStorage.getItem("token");
  if (token == null) {
    window.location.replace("index.html");
  }
  $.post("api/getuser.php", { token: token }, function (response) {
    var response = JSON.parse(response);
    if (!response.status) {
      alert(response.message);
    }
    $("#welcomeMsg").html(response.data);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    alert("An error occurred:" + errorThrown);
  });
  $("#logoutBtn").click(function () {
    var token = localStorage.getItem("token");
    $.post("api/logout.php", { token: token }, function (result) {
      var result = JSON.parse(result);
      if (!result.status) {
        alert(result.message);
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert("An error occurred:" + errorThrown);
    });
    localStorage.removeItem("token");
    window.location.replace("index.html");
  });
  $("#viewDonations").click(function () {
    $("#aboutData").html(``);
    $("#table").attr("class", "");
    $.get("api/getdonations.php", function (response) {
      var response = JSON.parse(response);
      if (response.status) {
        var result = response.data;
        var serialNumber = 1;
        $("#addRow").empty();
        for (let row of result) {
          const { id, amount, cause, gift_to } = row;
          $("#addRow").append(
            `<tr><td>` +
              serialNumber +
              `</td><td>${amount}</td><td>${cause}</td>><td>${gift_to}</td></tr>`
          );
          serialNumber++;
        }
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert("An error occurred:" + errorThrown);
    });
  });
});
