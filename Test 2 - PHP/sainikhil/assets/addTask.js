$(document).ready(function () {
  var userId = localStorage.getItem("token");
  console.log(userId);
  if (!userId) {
    window.location.replace("./login.html");
  }
  $("#sideBar").hide();
  $.ajax({
    type: "get",
    url: "./api/getUsers.php",

    success: function (result) {
      result = JSON.parse(result);
      console.log(result);
      for (i = 0; i < result.length; i++) {
        $("#userName").append(
          `<option value=${result[i].email}>${result[i].email}</option>`
        );
      }
    },
  });
  $("#addTaskBtn").click(function (e) {
    e.preventDefault();
    var userName = $("#userName").val();
    console.log(userName);
    var task = $("#task").val();
    if (task && userName) {
      $.ajax({
        type: "post",
        url: "./api/addTasks.php",
        data: { userName: userName, task: task },

        success: function (result) {
          console.log(result);
          result = JSON.parse(result);
          alert(result.message);
          window.location.replace("./adminpanel.html");
        },
      });
    } else {
      alert("Fill All The Fields");
    }
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
