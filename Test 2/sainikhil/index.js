$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "login.html",
    data: {},
    success: function (data) {
      $("#form").html(data);
    },
  });
});
