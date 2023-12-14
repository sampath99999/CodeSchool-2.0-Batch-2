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
        // postsContainer
        $.get(
          "apiconfig/getPostsData.php",
          { token: userToken },
          function (result) {
            var result = JSON.parse(result);
            if (result["status"]) {
              $.each(result["data"], function (index, value) {
                let createdDate = new Date(value["created_at"]);
                let day = createdDate.toLocaleString("en-us", {
                  day: "2-digit",
                });
                let month = createdDate.toLocaleString("en-us", {
                  month: "short",
                });
                let year = createdDate.toLocaleString("en-us", {
                  year: "numeric",
                });
                let imageUrl=value["image_url"]
                $(".postsContainer").append(`
              <div class="postCard border col-12 col-sm-7 col-md-5 col-lg-3 border-2 mb-5 border-black shadow-sm rounded">
              <div class="imgCard border-bottom border-2 border-dashed border-black">
              <img src="${imageUrl}" alt="postImg" class="postImg" />
              </div>
              <div class="d-flex justify-content-between ps-2 pe-2  pt-3">
              <h3 class="fw-bold">${value["title"]}</h3>
              <p class="m-0 text-secondary">${day} ${month} ${year}</p> 
              </div>
              <p class="ps-2">${value["description"]}</p>
              </div>
              `);
              });
            } else {
              console.error(result["message"]);
            }
          }
        );
      } else {
        localStorage.removeItem("access_token");
        window.href = "login.html";
      }
    });
  }
});
