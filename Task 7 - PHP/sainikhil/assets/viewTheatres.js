$(document).ready(function () {
  // var token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.replace("login.html");
  // }
  viewTheatres();
  $("#addTheatresBtn").click(function () {
    window.location.replace("./addtheatres.html");
  });
  $("#removeTheatresBtn").click(function () {
    removeTheatres();
  });
});
function viewTheatres() {
  $.post("./api/viewTheatres.php", function (result) {
    var result = JSON.parse(result);
    console.log(result);

    for (var i = 0; i < result.length; i++)
      $("#tableContent").append(
        `                <tr>
        <td><input type="checkbox" class="entry-checkbox" value="${result[i].id}"></td>
          <td>${result[i].theatre_name}</td>
          <td>${result[i].branch_name}</td>
          <td>${result[i].branch_address}</td>
        
      </tr>`
      );
  });
}
function removeTheatres() {
  var selectedEntries = [];

  $(".entry-checkbox:checked").each(function () {
    selectedEntries.push($(this).val());
  });

  if (selectedEntries.length > 0) {
    var branchIds = selectedEntries;

    $.ajax({
      type: "post",
      url: "./api/removeTheatres.php",
      data: { branch_ids: branchIds },

      success: function (result) {
        console.log(result);
        $("#tableContent").html("");
        viewTheatres();
      },
    });
  } else {
    alert("Select The Theatre");
  }
}
