let userToken = localStorage.getItem("access_token");
if (!userToken) {
  window.location.replace("login.html");
} else {
  $(document).ready(function () {
    let currentDate=new Date()
    // lastLogin
    $(".lastLoginDate").text(`${currentDate.getDate()}-${currentDate.toLocaleString("en-us",{month:"short"})}-${currentDate.getFullYear()}`)
    $(".lastLoginTime").text(`${currentDate.toLocaleString("en-us",{hour:"2-digit",minute:"2-digit"})}`)
    // logoutBtn
    $("#logoutBtn").click(function () {
      $.post("apiConfig/logout.php", { token: userToken }, function (result) {
        var result = JSON.parse(result);
        if (!result["status"]) {
          alert(result["message"]);
        }
      }).fail(function (jqXHR, statusText, errorThrown) {
        console.error(errorThrown);
      });
      localStorage.removeItem("access_token");
      window.location.replace("login.html");
    });
    $.get("apiConfig/userDetails.php", { token: userToken }, function (result) {
      var result = JSON.parse(result);
      if (result["status"]) {
        // contactsCard
        $(".showContactsBtn").click(function () {
          $("#chatRightContainer").toggleClass("chatRightContainer");
          $("#chatRightContainer").toggleClass("chatRightContainerClick");
        });
        // getUsersList
        $.get("apiConfig/getUsersDetails.php", function (result) {
          var result = JSON.parse(result);
          if (result["status"]) {
            $.each(result["data"], function (index, value) {
              $(".offcanvas-header").append(
                `<p class="m-0 pt-2 ps-2 pb-2">${value["name"]}</p>`
              );
            });
          } else {
            alert(result["message"]);
          }
        }).fail(function (jqXHR, statusText, errorThrown) {
          console.error(errorThrown);
        });
        // getMessagesFunction
        let getMessageData = function (userId) {
          $.get("apiConfig/getMessagesData.php", function (result) {
            var result = JSON.parse(result);
            if (result["status"]) {
              $(".chatContainer").empty();
              $.each(result["data"], function (index, result) {
                let date = new Date(result["created_at"]);
                let position =
                  userId === result["user_id"]
                    ? "align-self-end"
                    : "align-self-start";
                $(".chatContainer").append(`
                <div class="d-block ${position} chatCard bg-success bg-opacity-75 text-white rounded-3 fw-semibold p-3 me-2 ms-2 d-flex flex-column justify-content-between">
                <p class="m-0" >${result["message"]}</p>
                <div class="d-flex justify-content-between">
                <p class="text-info m-0">${result["name"]}</p>
                <p class="m-0 text-light fw-lighter fs-7">${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</p>
                </div>
                </div>
                `);
              });
            } else {
              alert(result["message"]);
            }
          }).fail(function (jqXHR, statusText, errorThrown) {
            console.error(errorThrown);
          });
        };

        getMessageData(result["data"]["id"]);

        let messageReloadInterval = setInterval(function () {
          getMessageData(result["data"]["id"]);
        }, 5000);
        // sendMsgBtn

        $(".msgSendBtn").click(async function () {
          if ($("#msgInputEl").val() !== "") {
            let message = $("#msgInputEl").val();
            let userId = result["data"]["id"];
            await $.post(
              "apiConfig/insertMessageData.php",
              { message: message, userId: userId },
              function (result) {
                var result = JSON.parse(result);
                if (result["status"]) {
                  getMessageData(userId);
                  $("#msgInputEl").val("")
                } else {
                  alert(result["message"]);
                }
              }
            ).fail(function (jqXHR, statusText, errorThrown) {
              console.error(errorThrown);
            });
          }
        });
      } else {
        localStorage.removeItem("access_token");
        window.location.replace("login.html");
      }
    }).fail(function (jqXHR, statusText, errorThrown) {
      console.error(errorThrown);
    });
  });
}
