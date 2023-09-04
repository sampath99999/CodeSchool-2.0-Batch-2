$(document).ready(function () {
  // var token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.replace("login.html");
  // }
  viewBookings();
});
function viewBookings() {
  $.post("./api/viewBookings.php", function (result) {
    var result = JSON.parse(result);
    console.log(result);

    for (var i = 0; i < result.length; i++) {
      $("#tableContent").append(
        `                <tr>
              
              <td>${result[i].movie_name}</td>
              <td>${result[i].theatre_name}</td>
              <td>${result[i].branch_name}</td>
              <td>${result[i].booked_seat_number}</td>
              <td>${result[i].payment_method}</td>
              
              
            
          </tr>`
      );
    }
  });
}
