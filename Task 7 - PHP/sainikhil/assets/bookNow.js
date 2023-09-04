$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "./api/viewMovies.php",

    success: function (result) {
      result = JSON.parse(result);
      console.log(result);
      $("#movieName").empty();
      $("#movieName").append(`<option selected>Movie</option>`);
      for (i = 0; i < result.length; i++) {
        $("#movieName").append(
          `
          <option value="${result[i].id}">${result[i].movie_name}</option>`
        );
      }
    },
  });
  $("#movieName").change(function () {
    $("#theatreName").empty();
    var movie_id = $("#movieName").val();
    $.ajax({
      type: "post",
      url: "./api/getTheatre.php",
      data: { movie_id: movie_id },

      success: function (result) {
        result = JSON.parse(result);
        var result = removeDuplicatesByKey(result, "id");
        $("#theatreName").append(`
        <option selected">Theatre Name</option>`);
        for (i = 0; i < result.length; i++) {
          $("#theatreName").append(
            `
          <option value="${result[i].id}">${result[i].theatre_name}</option>`
          );
        }
        console.log(result[0].theatre_name);
      },
    });
  });

  $("#theatreName").change(function () {
    $("#branchName").empty();
    var movie_id = $("#movieName").val();
    var theatre_id = $("#theatreName").val();
    $.ajax({
      type: "post",
      url: "./api/getBranch.php",
      data: { movie_id: movie_id, theatre_id: theatre_id },

      success: function (result) {
        result = JSON.parse(result);
        console.log(result);
        var result = $.grep(result, function (value) {
          return value !== false;
        });
        var result = removeDuplicatesByKey(result, "id");
        $("#branchName").append(`<option selected">Branch Name</option>`);
        for (i = 0; i < result.length; i++) {
          $("#branchName").append(
            `
          <option value="${result[i].id}">${result[i].branch_name}</option>`
          );
        }
      },
    });
  });

  $("#branchName").change(function () {
    $("#slot").empty();
    var movie_id = $("#movieName").val();
    var branch_id = $("#branchName").val();
    $.ajax({
      type: "post",
      url: "./api/getSlotBooking.php",
      data: { movie_id: movie_id, branch_id: branch_id },

      success: function (result) {
        result = JSON.parse(result);
        console.log(result);

        $("#slot").append(`<option selected">Slot</option>`);
        for (i = 0; i < result.length; i++) {
          $("#slot").append(
            `
          <option value="${result[i].slot}">${result[i].slot}</option>`
          );
        }
      },
    });
  });

  $("#slot").change(function () {
    $("#seats").empty();
    var slot = $("#slot").val();
    var movie_id = $("#movieName").val();
    var branch_id = $("#branchName").val();
    $.ajax({
      type: "post",
      url: "./api/getBookedSeats.php",
      data: { movie_id: movie_id, branch_id: branch_id, slot: slot },

      success: function (result) {
        result = JSON.parse(result);
        var arrayOfObjects = result;

        var combinedArray = [];
        console.log(result);
        arrayOfObjects.forEach(function (obj) {
          var seatNumbers = obj.booked_seat_number
            .replace(/[{()}]/g, "")
            .split(",");
          seatNumbers.forEach(function (number) {
            combinedArray.push(parseInt(number, 10));
          });
        });
        console.log(combinedArray);
        $.ajax({
          type: "post",
          url: "./api/getNumberOfSeats.php",
          data: { movie_id: movie_id, branch_id: branch_id, slot: slot },

          success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            console.log(result);

            var noOfSeats = result.seats;
            console.log(noOfSeats);

            for (var i = 1; i <= noOfSeats; i++) {
              var checkbox = $(
                `<input type="checkbox" class="entry-checkbox me-1" value="${i}"></input>`
              );

              if ($.inArray(i, combinedArray) !== -1) {
                checkbox.prop("disabled", true);
              }

              $("#seats").append(checkbox);
            }
          },
        });
      },
    });
  });
  $("#bookTickets").click(function () {
    bookTickets();
  });
});
function removeDuplicatesByKey(array, key) {
  return array.filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj[key] === item[key])
  );
}
function bookTickets() {
  var payment_method = $("#paymentMethod").val();
  var movie_id = $("#movieName").val();
  var theatre_id = $("#theatreName").val();
  var branch_id = $("#branchName").val();
  var slot = $("#slot").val();
  var selectedEntries = [];

  $(".entry-checkbox:checked").each(function () {
    selectedEntries.push($(this).val());
  });
  var seats = selectedEntries;
  var seats = "{" + seats.join(", ") + "}";

  if (movie_id && theatre_id && branch_id && slot && seats && payment_method) {
    $.ajax({
      type: "post",
      url: "./api/booking.php",
      data: {
        movie_id: movie_id,
        branch_id: branch_id,
        slot: slot,
        seats: seats,
        payment_method: payment_method,
      },
      success: function (result) {
        console.log(result);
        result = JSON.parse(result);
        alert(result.message);
        window.location.replace("./viewshows.html");
      },
    });
  }
}
