$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "./api/dashboardTheatres.php",

    success: function (result) {
      result = JSON.parse(result);
      $("#recentTheatres").html();
      for (i = 0; i < result.length; i++) {
        console.log(result[i].theatre_name);
        $("#recentTheatres").append(
          `<li
        class="list-group-item bg-black border-danger bg-opacity-25 text-white"
      >
       ${result[i].theatre_name}
      </li>;`
        );
      }
    },
  });
  $.ajax({
    type: "get",
    url: "./api/dashboardMovies.php",

    success: function (result) {
      result = JSON.parse(result);
      $("#recentMovies").html();
      for (i = 0; i < result.length; i++) {
        console.log(result[i].movie_name);
        $("#recentMovies").append(
          `<li
        class="list-group-item bg-black border-danger bg-opacity-25 text-white"
      >
       ${result[i].movie_name}
      </li>;`
        );
      }
    },
  });
});
