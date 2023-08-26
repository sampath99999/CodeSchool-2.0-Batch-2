$(document).ready(function () {
  var token = localStorage.getItem("access_token");
  $("#logoutBtn").click(function () {
    localStorage.removeItem("access_token");
    window.location.href = "login.html";
  });
  if (!token) {
    window.location.href = "login.html";
  } else {
    $.get("apiconfig/home.php", { token: token }, function (result) {
      var result = JSON.parse(result);
      if (result["status"]) {
        for (let i of result["data"]) {
          if (i["table_name"] != "employees") {
            $("#tablesUl").append(`
        <li class="nav-item" id="${i["table_name"]}">
          <a class="nav-link fw-semibold" href="#" >${i[
            "table_name"
          ].toUpperCase()}</a>
        </li>
        `);
          }
        }
        let getTablesData = function (tablename) {
          $.get(
            "apiconfig/tablesData.php",
            { tablename: tablename },
            function (result) {
              var result = JSON.parse(result);
              let data = [];

              $(".contentCard").empty();
              $(".contentCard").append(`
                <input type="search" class="form-control bg-transparent mb-3 text-white" id="searchInputEl" placeholder="🔍 Search" />
                <div class="table-responsive">
                  <table class="table table-hover table-bordered">
                    <thead class="tableHeadCard" >
                      <tr>            
                      </tr>
                    </thead>
                    <tbody class="tableBodyCard">
                    </tbody>
                  </table>
                </div>
              `);
              $("#searchInputEl").keyup(function () {
                data = [];
                for (let i of result["data"]) {
                  for (let j in i) {
                    if (String(i[j]).toLowerCase().includes($(this).val())) {
                      data = [...data, i];
                      break;
                    }
                  }
                }
                console.log(data);
                $(".tableBodyCard").empty();
                for (let i of data) {
                  $(".tableBodyCard").append(`
                  <tr>
                  ${tableRow}
                  </tr>
                `);
                  var tableRow = "";
                  for (let j in i) {
                    tableRow += `<td class="text-white fw-bold">${i[j]}</td>`;
                  }
                }
              });
              for (let i in result["data"][0]) {
                $(".tableHeadCard")
                  .children()
                  .append(
                    `<th scope="col" class="text-white">${i.toUpperCase()}</th> `
                  );
              }
              for (let i of result["data"]) {
                $(".tableBodyCard").append(`
                  <tr>
                  ${tableRow}
                  </tr>
                `);
                var tableRow = "";
                for (let j in i) {
                  tableRow += `<td class="text-white fw-bold">${i[j]}</td>`;
                }
              }
            }
          );
        };
        $("#theaters").click(function () {
          getTablesData("theaters");
        });
        $("#customers").click(function () {
          getTablesData("customers");
        });
        $("#movies").click(function () {
          getTablesData("movies");
        });
        $("#bookings").click(function () {
          getTablesData("bookings");
        });
        let movieQuotes = [
          "Bringing the box office to your fingertips – one ticket at a time.",
          "Empowering moviegoers and streamlining cinema experiences.",
          "Seamless ticket management for the cinema dream team.",
          "From showtimes to sold-out seats, all in the palm of your hand.",
          "Where movie magic meets modern convenience.",
          "Unlocking the reel world with every scan and swipe.",
          "Because every movie deserves a full house.",
          "Your pass to stress-free ticketing, anytime, anywhere.",
          "Turning movie nights into memorable experiences, one app at a time.",
          "Tickets made easy, for the love of cinema and its fans.",
          "No lines, no wait – just lights, camera, app-tion!",
          "Bringing movie joy to screens and scanners near you.",
          "Lights down, curtains up – and your digital ticket shines.",
          "Curtains rise on efficiency: the movie staff's ultimate companion.",
          "Joining the cast of cinema enthusiasts – all on the app stage.",
        ];
        let bodyContent = function () {
          $(".contentCard").empty();
          $(".contentCard").prepend(`

            <div class="d-flex flex-column  justify-content-center align-items-center text-white gap-5 h-100">
              <h2 class="m-0 userName">Welcome ${
                result["user_details"]["firstname"]
              } ${result["user_details"]["lastname"]}!</h2>
              <div class="ratio ratio-16x9 videoStyle">
                <iframe src="https://www.youtube.com/embed/Ad4p0XTMH-c?rel=0" title="YouTube video" class="rounded-5"></iframe>
              </div>
              <p class="m-0 text-primary">${
                movieQuotes[Math.floor(Math.random() * movieQuotes.length)]
              }</p>
            </div>
          `);
        };
        $(".movieLogo").click(function () {
          bodyContent();
        });
        bodyContent();
        $(".dropdown-menu").prepend(`
        <li>
          <a class="dropdown-item " href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle text-warning" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          ${result["user_details"]["firstname"]} ${result["user_details"]["lastname"]}
          </a>
        </li>
        <li>
          <a class="dropdown-item " href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope text-warning" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
          </svg>
          ${result["user_details"]["email"]}
          </a>
        </li>
        `);
      } else {
        console.log(result["message"]);
      }
    });
  }
});
