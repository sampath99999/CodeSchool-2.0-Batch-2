$(document).ready(function () {
  var token = localStorage.getItem("token");
  $("#sideBar").hide();
  if (token) {
    $.ajax({
      type: "post",
      url: "./api/getLoginInfo.php",
      data: { token: token },

      success: function (result) {
        console.log(result);
        result = JSON.parse(result);
        $("#welcomeMessage").html(`Welcome, ${result.email}`);
        $("#userName").html(` ${result.email}`);
        $.ajax({
          type: "post",
          url: "./api/getUserTask.php",
          data: { email: result.email },

          success: function (result) {
            result = JSON.parse(result);
            $("#taskCount").html(result.length);
          },
        });
      },
    });
  }

  $("#navMenu").click(function () {
    $("#navBar").hide();
    $("#sideBar").show();
  });
  $("#sideBarMenu").click(function () {
    $("#sideBar").hide();
    $("#navBar").show();
  });
});
