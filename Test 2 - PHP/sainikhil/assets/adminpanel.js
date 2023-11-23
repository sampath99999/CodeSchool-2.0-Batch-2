$(document).ready(function () {
  var userId = localStorage.getItem("token");
  console.log(userId);
  console.log("helo");
  if (!userId) {
    window.location.replace("./login.html");
  }
  $("#sideBar").hide();
  $.ajax({
    type: "get",
    url: "./api/getUsers.php",

    success: function (result) {
      result = JSON.parse(result);
      var len = result.length;
      $("#userCount").html(len);
    },
  });

  $.ajax({
    type: "get",
    url: "./api/getTasks.php",

    success: function (result) {
      result = JSON.parse(result);
      var len = result.length;
      $("#taskCount").html(len);
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
