$(document).ready(function () {
  var token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login.html");
  }
  getOrders();
});
function getOrders() {
  $.get("./api/viewOrders.php", function (result) {
    var result = JSON.parse(result);

    for (var i = 0; i < result.length; i++)
      $("#tableContent").append(
        `                <tr>
        <td>${result[i].order_id}</td>
        <td>${result[i].customer_id}</td>
        <td>${result[i].order_date}</td>
        <td>${result[i].promised_delivery_date}</td>
        <td>${result[i].product_id}</td>

       
    </tr>`
      );
  });
}
