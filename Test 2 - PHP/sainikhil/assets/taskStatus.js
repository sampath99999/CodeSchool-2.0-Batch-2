$(document).ready(function () {
  var token = localStorage.getItem("token");
  $.ajax({
    type: "post",
    url: "./api/viewTaskUser.php",
    data: { token: token },

    success: function (result) {
      result = JSON.parse(result);
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        $("#tasks").append(
          `    <option>${result[i].task}     </option>       `
        );
      }
    },
  });
  $("#sideBar").hide();

  $("#navMenu").click(function () {
    $("#navBar").hide();
    $("#sideBar").show();
  });
  $("#sideBarMenu").click(function () {
    $("#sideBar").hide();
    $("#navBar").show();
  });
  $('#updateStatus').click(function (e) { 
    e.preventDefault();
    $.post("./api/taskStatus.php", {},
        function (result) {
            
        }
    );
  });
});
