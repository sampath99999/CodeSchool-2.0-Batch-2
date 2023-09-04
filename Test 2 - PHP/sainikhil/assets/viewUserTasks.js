$(document).ready(function () {
  var token = localStorage.getItem("token");
  $("#sideBar").hide();
  $.ajax({
    type: "post",
    url: "./api/viewTaskUser.php",
    data: { token: token },

    success: function (result) {
      console.log(result);
      result = JSON.parse(result);
      for (var i = 0; i < result.length; i++) {
        $("#tableContent").append(
          `                <tr>
               
                <td>${result[i].task}</td>
                
              
            </tr>`
        );
      }
    },
  });
  $("#navMenu").click(function () {
    $("#navBar").hide();
    $("#sideBar").show();
  });
  $("#sideBarMenu").click(function () {
    $("#sideBar").hide();
    $("#navBar").show();
  });
});
