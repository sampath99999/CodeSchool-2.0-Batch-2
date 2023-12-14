$(document).ready(function () {
  let userToken = localStorage.getItem("access_token");
  if (!userToken) {
    window.location.href = "login.html";
  } else {
    $.get("apiconfig/userDetails.php", { token: userToken }, function (result) {
      var result = JSON.parse(result);
      if (result["status"]) {
        // logoutBtn
        $("#logoutBtn").click(function () {
          $.post(
            "apiconfig/logout.php",
            { token: userToken },
            function (result) {}
          );
          localStorage.removeItem("access_token");
          window.location.href = "login.html";
        });
        $(".adminHead").text(`
          Admin:${result["data"]["name"]}
        `);
        // imageUrlEL
        let imageUrlBoolean = false;
        $("#imageUrlEl").blur(function () {
          if ($(this).val() === "") {
            $(".imageUrlErr").text("*Please enter imageurl");
          } else {
            imageUrlBoolean = true;
            $(".imageUrlErr").text("");
          }
        });

        // titleEl
        let titleBoolean = false;
        $("#titleEl").blur(function () {
          if ($(this).val() === "") {
            $(".titleErr").text("*Please enter title");
          } else {
            titleBoolean = true;
            $(".titleErr").text("");
          }
        });

        // descriptionEl

        let descriptionBoolean = false;
        $("#descriptionEl").blur(function () {
          if ($(this).val() === "") {
            $(".descriptionErr").text("*Please enter description");
          } else {
            descriptionBoolean = true;
            $(".descriptionErr").text("");
          }
        });

        $("#addPostBtn").click(function () {
          let imageurl = $("#imageUrlEl").val();
          let title = $("#titleEl").val();
          let description = $("#descriptionEl").val();
          if (!imageUrlBoolean) {
            if (imageurl === "") {
              $(".imageUrlErr").text("*Please enter imageurl");
            }
          }
          if (!titleBoolean) {
            if (title === "") {
              $(".titleErr").text("*Please enter title");
            }
          }
          if (!descriptionBoolean) {
            if (description === "") {
              $(".descriptionErr").text("*Please enter description");
            }
          } else if (imageUrlBoolean && titleBoolean && descriptionBoolean) {
            var fileUploaded = $("#imageUrlEl")[0].files[0];
            var formData = new FormData();
            formData.append("imageUrl", fileUploaded);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("adminId", result["data"]["id"]);

            $.ajax({
              url: "apiconfig/insertPost.php",
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              success: function (response) {
                var result = JSON.parse(response);
                alert(result["message"]);
                $("#imageUrlEl").val("");
                $("#titleEl").val("");
                $("#descriptionEl").val("");
              },
              error: function (xhr, status, error) {
                console.error(error);
              },
            });
          }
        });
      } else {
        localStorage.removeItem("access_token");
        window.href = "login.html";
      }
    });
  }
});
