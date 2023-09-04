$(document).ready(function () {
  // var token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.replace("login.html");
  // }

  viewShowsTable();
  $("#addShowBtn").click(function () {
    window.location.replace("./addShow.html");
  });
  $("#removeShowsBtn").click(function () {
    removeShows();
  });
});
function viewShowsTable() {
  $.get("./api/showsTable.php", function (result) {
    var result = JSON.parse(result);
    console.log(result);

    for (var i = 0; i < result.length; i++) {
      $("#tableContent").append(
        `              <tr>
          <td><input type="checkbox" class="entry-checkbox" value="${result[i].id}"></td>
          <td>${result[i].movie_name}</td>
          <td>${result[i].theatre_name}</td>
          <td>${result[i].branch_name}</td>
          <td>${result[i].branch_address}</td>
          <td>${result[i].slot}</td>
          <td>${result[i].seats}</td>
          
        
      </tr>
          `
      );
    }
  });
}
function removeShows() {
  var selectedEntries = [];

  $(".entry-checkbox:checked").each(function () {
    selectedEntries.push($(this).val());
  });

  if (selectedEntries.length > 0) {
    var show_ids = selectedEntries;

    $.ajax({
      type: "post",
      url: "./api/removeShows.php",
      data: { show_ids: show_ids },

      success: function (result) {
        console.log(result);
        $("#tableContent").html("");
        viewShowsTable();
      },
    });
  } else {
    alert("Select The Show");
  }
}
