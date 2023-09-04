$(document).ready(function () {
  $("#addTheatreBtn").click(function (e) {
    e.preventDefault();
    addTheatre();
  });
  $("#addBranchBtn").click(function (e) {
    e.preventDefault();
    addBranch();
  });
});
function addTheatre() {
  var theatreName = $("#theatreName").val();
  var branchName = $("#branchName").val();
  var branchAddress = $("#branchAddress").val();

  if (theatreName && branchName && branchAddress) {
    $.post(
      "./api/addTheatre.php",
      {
        theatreName: theatreName,
        branchName: branchName,
        branchAddress: branchAddress,
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
function addBranch() {
  $.ajax({
    type: "get",
    url: "./addbranch.html",

    success: function (result) {
      $("#addTheatreForm").html(result);
    },
  });
}
