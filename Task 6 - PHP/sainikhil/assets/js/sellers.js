$(document).ready(function () {
  var token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login.html");
  }
  getSellers();

  $("#removeSellersBtn").click(function () {
    var selectedEntries = [];

    $(".entry-checkbox:checked").each(function () {
      selectedEntries.push($(this).val());
    });

    if (selectedEntries.length > 0) {
      var sellerIds = selectedEntries;

      $.ajax({
        type: "post",
        url: "./api/deleteSellers.php",
        data: { sellerIds: sellerIds },

        success: function (result) {
          console.log(result);
          $("#tableContent").html("");
          getSellers();
        },
      });
    } else {
      alert("Select The Seller");
    }
  });
  $("#addSellersBtn").click(function () {
    window.location.replace("./addsellers.html");
  });
});

function getSellers() {
  $.get("./api/viewSellers.php", function (result) {
    var result = JSON.parse(result);

    for (var i = 0; i < result.length; i++)
      $("#tableContent").append(
        `                <tr>
      <td><input type="checkbox" class="entry-checkbox" value="${result[i].seller_id}"></td>
      <td>${result[i].seller_id}</td>
      <td>${result[i].seller_name}</td>
     
  </tr>`
      );
  });
}
