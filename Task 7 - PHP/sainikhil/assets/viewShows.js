$(document).ready(function () {
  // var token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.replace("login.html");
  // }
  viewMovies();
  $("#addShowBtn").click(function () {
    window.location.replace("./addshow.html");
  });
  $("#removeShowBtn").click(function () {
    window.location.replace("./showstable.html");
  });
  $("#bookBtn").click(function () {
    $.ajax({
      type: "get",
      url: "./booknow.html",

      success: function (result) {
        $("#replace").html(result);
      },
    });
  });
});
function viewMovies() {
  $.get("./api/viewMovies.php", function (result) {
    var result = JSON.parse(result);
    console.log(result);

    for (var i = 0; i < result.length; i++) {
      $("#showsCard").append(
        ` <div class="card bg-secondary bg-opacity-25 mb-5" style="width: 18rem;">              
        <div class="card-body">
          <h3 class="card-title text-white">${result[i].movie_name}</h3>
         
          <p class="card-text text-white"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis hic nulla ipsa aliquid at laborum dolorem molestias accusamus ab? Corrupti, laborum perferendis! Cum, reiciendis! Ea nulla quia ut enim distinctio.</p>
          <button class="btn btn-danger booknow" value='${result[i].id}'>Book Now</button>
          
        </div>
        </div> 
        `
      );
    }
  });
}
// $(".booknow").click(function (e) {
//   e.preventDefault();
//   console.log("hh");
// });
