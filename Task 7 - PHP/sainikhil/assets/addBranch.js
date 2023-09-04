$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "./api/getTheatres.php",

    success: function (result) {
      result = JSON.parse(result);
      console.log(result.length);
      for (i = 0; i < result.length; i++) {
        $("#theatreName").append(`
            <option value="${result[i].id}">${result[i].theatre_name}</option>            
            `);
      }
    },
  });
  $("#addBranchBtn").click(function (e) {
    e.preventDefault();
    addBranch();
  });
});
function addBranch() {
  var theatreId = $("#theatreName").val();
  var branchName = $("#branchName").val();
  var branchAddress = $("#branchAddress").val();
  console.log(theatreId, branchName, branchAddress);

  if (branchName && branchAddress && theatreId) {
    $.post(
      "./api/addBranch.php",
      {
        theatre_id: theatreId,
        branch_name: branchName,
        branch_address: branchAddress,
      },
      function (result) {
        console.log(result);
        result = JSON.parse(result);
        alert(result.message);
        window.location.replace("./viewtheatres.html");
      }
    );
  } else {
    alert("All Fields Must Be Filled");
  }
}
