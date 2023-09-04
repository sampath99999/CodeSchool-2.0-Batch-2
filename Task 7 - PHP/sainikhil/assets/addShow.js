$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "./api/getTheatres.php",

    success: function (result) {
      result = JSON.parse(result);
      console.log(result.length);
      $("#theatreName").html();
      for (i = 0; i < result.length; i++) {
        console.log(result[i].id);
        $("#theatreName").append(`
                <option value="${result[i].id}">${result[i].theatre_name}</option>            
                `);
      }
    },
  });

  $.ajax({
    type: "get",
    url: "./api/viewMovies.php",

    success: function (result) {
      result = JSON.parse(result);
      console.log(result.length);
      $("#movieName").html();
      for (i = 0; i < result.length; i++) {
        console.log(result[i].movie_name);

        $("#movieName").append(`
                <option value="${result[i].id}">${result[i].movie_name}</option>            
                `);
      }
    },
  });

  $("#theatreName").change(function () {
    var theatre_id = $("#theatreName").val();
    $("#branchName").empty();
    $.ajax({
      type: "post",
      url: "./api/getBranches.php",
      data: { theatre_id: theatre_id },

      success: function (result) {
        result = JSON.parse(result);
        $("#branchName").append(`<option selected>select</option> `);
        for (i = 0; i < result.length; i++) {
          $("#branchName").append(`
                    <option value="${result[i].id}">${result[i].branch_name}</option>            
                    `);
        }
      },
    });
  });

  $("#branchName").change(function () {
    $("#slot").empty();
    var branch_id = $("#branchName").val();
    console.log(branch_id);
    $.ajax({
      type: "post",
      url: "./api/getSlot.php",
      data: { branch_id: branch_id },

      success: function (result) {
        console.log(result);
        result = JSON.parse(result);
        var type = $.type(result);
        console.log(type);
        if (type == "object") {
          length = Object.keys(result);

          console.log(length);

          for (var key in result) {
            if (result.hasOwnProperty(key)) {
              var value = result[key];
              console.log(result);
              $("#slot").append(`<option value="${value}">${value}</option>`);
            }
          }
        } else {
          //   result = JSON.parse(result);
          for (i = 0; i < result.length; i++) {
            console.log(result[i]);
            $("#slot").append(
              `<option value="${result[i]}">${result[i]}</option>`
            );
          }
        }
      },
    });
  });

  $("#addShowBtn").click(function (e) {
    e.preventDefault();
    var movie_id = $("#movieName").val();
    var branch_id = $("#branchName").val();
    var slot = $("#slot").val();
    var seats = $("#seats").val();
    if (!$.isNumeric(seats)) {
      alert("Seats Must be Number");
      return;
    }

    if (movie_id && branch_id && slot && seats) {
      $.post(
        "./api/addShow.php",
        {
          movie_id: movie_id,
          branch_id: branch_id,
          slot: slot,
          seats: seats,
        },
        function (result) {
          result = JSON.parse(result);
          alert(result.message);
          window.location.replace("./showstable.html");
        }
      );
    }
  });
});
