$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (!userId) {
    window.location.replace("login.html");
  }

  $("#imgSubmitBtn").click(function (e) {
    e.preventDefault();
    var categoryInput = $("#categoryInput").val();

    var fileUploaded = $("#fileUploadInput")[0].files[0];
    var formData = new FormData();
    formData.append("imageUrl", fileUploaded);
    formData.append("categoryInput", categoryInput);
    $.ajax({
      url: "./api/insertImage.php",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success: function (response) {
        console.log(response);
        var result = JSON.parse(response);
        alert(result["message"]);
        if (result["status"]) {
          window.location.replace("./dashboard.html");
        }
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  });
  $.ajax({
    type: "get",
    url: "./api/getImages.php",

    success: function (result) {
      result = JSON.parse(result);
      console.log(result);
      result.forEach((img) => {
        $("#imageContent").append(
          `<div class="card my-2 border-warning border-4" style="width: 25rem;"><img src="./api/upload/${img.img_url}" alt="" " class="img-fluid" style="object-fit : cover"></div>`
        );
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
  $("#imgSearch").keyup(function (e) {
    var value = $("#imgSearch").val().toLowerCase();
    $.ajax({
      type: "get",
      url: "./api/getImages.php",

      success: function (response) {
        $("#imageContent").empty();
        console.log(response);
        results = JSON.parse(response);

        const regexPattern = new RegExp(value, "i");

        const filteredResults = results.filter((result) =>
          regexPattern.test(result.name)
        );

        filteredResults.forEach((result) => {
          $("#imageContent").append(
            `<div class="card my-2 border-warning border-4" style="width: 25rem;"><img src="./api/upload/${result.img_url}" alt="" " class="img-fluid" style="object-fit : cover"></div>`
          );
        });
      },
    });
  });

  $("#logoutBtn").click(function () {
    var token = localStorage.getItem("token");
    $.post("./api/logout.php", { token: token }, function (result) {
      result = JSON.parse(result);
      if (result.status) {
        localStorage.removeItem("token");
        alert(result.message);
        window.location.replace("./login.html");
      }
    });
  });
});
