$(document).ready(function () {
  // var token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.replace("login.html");
  // }
  viewMovies();
  $("#addMoviesBtn").click(function () {
    window.location.replace("./addmovies.html");
  });
  $("#removeMoviesBtn").click(function () {
    removeMovies();
  });
});
function viewMovies() {
  $.post("./api/viewMovies.php", function (result) {
    var result = JSON.parse(result);
    console.log(result);

    for (var i = 0; i < result.length; i++) {
      $("#tableContent").append(
        `                <tr>
            <td><input type="checkbox" class="entry-checkbox" value="${result[i].id}"></td>
            <td>${result[i].movie_name}</td>
            
          
        </tr>`
      );
    }
  });
}
function removeMovies() {
  var selectedEntries = [];

  $(".entry-checkbox:checked").each(function () {
    selectedEntries.push($(this).val());
  });

  if (selectedEntries.length > 0) {
    var movieIds = selectedEntries;

    $.ajax({
      type: "post",
      url: "./api/removeMovies.php",
      data: { movie_ids: movieIds },

      success: function (result) {
        console.log(result);
        $("#tableContent").html("");
        viewMovies();
      },
    });
  } else {
    alert("Select The Movie");
  }
}
