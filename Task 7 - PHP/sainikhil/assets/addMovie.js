$(document).ready(function () {
  $("#addMovieBtn").click(function (e) {
    e.preventDefault();
    addMovie();
  });
});
function addMovie() {
  var movieName = $("#movieName").val();
  if (movieName) {
    $.post(
      "./api/addMovie.php",
      {
        movie_name: movieName,
      },
      function (result) {
        result = JSON.parse(result);
        alert(result.message);
        window.location.replace("./viewmovies.html");
      }
    );
  } else {
    alert("All Fields Must Be Filled");
  }
}
