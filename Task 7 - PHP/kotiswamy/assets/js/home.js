$(document).ready(function () {
  var token = localStorage.getItem("access_token");

  
  if (!token) {
    window.location.href = "login.html";
  } else {
    $.get("apiconfig/home.php", { token: token }, function (result) {
      var result = JSON.parse(result);
      if (!result["user_details"]) {
        window.location.replace("login.html");
      } else if (result["status"]) {

        // logout
        $("#logoutBtn").click(function () {
          localStorage.removeItem("access_token");
          window.location.href = "login.html";
          $.post("apiconfig/logout.php",{userId:result["user_details"]["id"]},function(result){
            
          })
        });
        // curd operantions
        // Add theater
        // theaterNameEl
        let theaterNameBoolean = false;
        $("#theaterName").blur(function () {
          if ($(this).val() === "") {
            theaterNameBoolean = false;
            $(".theaterNameErr").text("*Please enter theater name");
          } else {
            theaterNameBoolean = true;
            $(".theaterNameErr").text("");
          }
        });

        // theaterAddressEl
        let theaterAddressBoolean = false;
        $("#theaterAddress").blur(function () {
          if ($(this).val() === "") {
            theaterAddressBoolean = false;
            $(".theaterAddressErr").text("*Please enter theater address");
          } else {
            theaterAddressBoolean = true;
            $(".theaterAddressErr").text("");
          }
        });

        // theaterFoundedYear

        let theaterFoundedYearBoolean = false;
        $("#theaterFoundedYear").blur(function () {
          if (
            $(this).val().length !== 4 ||
            $(this)
              .val()
              .match(/[^0-9]/)
          ) {
            theaterFoundedYearBoolean = false;
            $(".theaterFoundedYearErr").text("*Please enter valid year");
          } else {
            theaterFoundedYearBoolean = true;
            $(".theaterFoundedYearErr").text("");
          }
        });

        // theaterSeatingCapacity
        let theaterSeatingCapacityBoolean = false;
        $("#theaterSeatingCapacity").blur(function () {
          if (
            $(this).val() === "" ||
            $(this).val().match(/\D/) ||
            $(this).val().includes(".")
          ) {
            theaterSeatingCapacityBoolean = false;
            $(".theaterSeatingCapacityErr").text(
              "*Please enter valid capacity"
            );
          } else {
            theaterSeatingCapacityBoolean = true;
            $(".theaterSeatingCapacityErr").text("");
          }
        });

        // ticketPrice
        let ticketPriceBoolean = false;
        $("#ticketPrice").blur(function () {
          if ($(this).val() === "") {
            ticketPriceBoolean = false;
            $(".ticketPriceErr").text("*Please enter ticket price");
          } else {
            ticketPriceBoolean = true;
            $(".ticketPriceErr").text("");
          }
        });

        // theater addBtn

        $(".theaterAddBtn").click(function () {
          let theaterName = $("#theaterName").val();
          let theaterAddress = $("#theaterAddress").val();
          let theaterFoundedYear = $("#theaterFoundedYear").val();
          let theaterSeatingCapacity = $("#theaterSeatingCapacity").val();
          let ticketPrice = $("#ticketPrice").val();
          if (!theaterNameBoolean) {
            if (theaterName === "") {
              $(".theaterNameErr").text("*Please enter theater name");
            }
          }
          if (!theaterAddressBoolean) {
            if (theaterAddress === "") {
              $(".theaterAddressErr").text("*Please enter theater address");
            }
          }
          if (!theaterFoundedYearBoolean) {
            if (theaterFoundedYear === "") {
              $(".theaterFoundedYearErr").text("*Please enter year");
            }
          }
          if (!theaterSeatingCapacityBoolean) {
            if (theaterSeatingCapacity === "") {
              $(".theaterSeatingCapacityErr").text(
                "*Please enter seating capacity"
              );
            }
          }
          if (!ticketPriceBoolean) {
            if (ticketPrice === "") {
              $(".ticketPriceErr").text("*Please enter ticket price");
            }
          } else if (
            theaterNameBoolean &&
            theaterFoundedYearBoolean &&
            theaterAddressBoolean &&
            theaterSeatingCapacityBoolean &&
            ticketPriceBoolean
          ) {
            $.post(
              "apiconfig/insertTheaterData.php",
              {
                name: theaterName,
                address: theaterAddress,
                founded: theaterFoundedYear,
                seatingCapacity: theaterSeatingCapacity,
                ticketPrice: ticketPrice,
                userId: result["user_details"]["id"],
              },
              function (result) {
                var result = JSON.parse(result);
                alert(result["message"]);
              }
            );
          }
        });

        //theaterCloseBtn

        $(".theaterCloseBtn").click(function () {
          $("#theaterName").val("");
          $("#theaterAddress").val("");
          $("#theaterFoundedYear").val("");
          $("#theaterSeatingCapacity").val("");
          $("#ticketPrice").val("");
          $(".theaterNameErr").text("");
          $(".theaterAddressErr").text("");
          $(".theaterFoundedYearErr").text("");
          $(".theaterSeatingCapacityErr").text("");
          $(".ticketPriceErr").text("");
        });
        // addMovieCard

        var getOptionsTableData = function (data) {
          $("#inputGroupTheater")
            .empty()
            .append("<option selected value=''>Choose theater name</option>");
          $("#inputGroupMovie")
            .empty()
            .append('<option selected value="">Choose movie name</option>');
          $.get(
            "apiconfig/tablesData.php",
            { userId: data },
            function (result) {
              var result = JSON.parse(result);
              $.each(result["theatersList"], function (index, value) {
                $("#inputGroupTheater").append(
                  `<option value=${value["id"]}>${value["theater_name"]}</option>`
                );
              });
              $.each(result["moviesList"], function (index, value) {
                $("#inputGroupMovie").append(
                  `<option value=${value["id"]}>${value["movie_name"]}</option>`
                );
              });
            }
          );
        };

        $("#addMovieCard").click(function () {
          getOptionsTableData(result["user_details"]["id"]);
        });
        // inputGroupTheater
        let inputGroupTheaterBoolean = false;
        $("#inputGroupTheater").blur(function () {
          if ($(this).val() === "") {
            inputGroupTheaterBoolean = false;
            $(".inputGroupTheaterErr").text("*Please select theater name");
          } else {
            inputGroupTheaterBoolean = true;
            $(".inputGroupTheaterErr").text("");
          }
        });

        // inputGroupMovie
        let inputGroupMovieBoolean = false;
        $("#inputGroupMovie").blur(function () {
          if ($(this).val() === "") {
            inputGroupMovieBoolean = false;
            $(".inputGroupMovieErr").text("*Please select movie name");
          } else {
            inputGroupMovieBoolean = true;
            $(".inputGroupMovieErr").text("");
          }
        });

        // showDateTime
        let showDateTimeBoolean = false;
        $("#showDateTime").blur(function () {
          if ($(this).val() === "") {
            showDateTimeBoolean = false;
            $(".showDateTimeErr").text("Please select show date & time");
          } else {
            showDateTimeBoolean = true;
            $(".showDateTimeErr").text("");
          }
        });

        // movieCloseBtn
        $(".movieCloseBtn").click(function () {
          $(".inputGroupTheaterErr").text("");
          $(".inputGroupMovieErr").text("");
          $(".showDateTimeErr").text("");
          $("#inputGroupTheater").val("");
          $("#inputGroupMovie").val("");
          $("#showDateTime").val("");
        });

        // movieAddBtn
        $(".movieAddBtn").click(function () {
          let theaterId = $("#inputGroupTheater").val();
          let movieId = $("#inputGroupMovie").val();
          let showDateTime = $("#showDateTime").val();
          if (!inputGroupTheaterBoolean) {
            if (theaterId === "") {
              inputGroupTheaterBoolean = false;
              $(".inputGroupTheaterErr").text("*Please select theater name");
            }
          }
          if (!inputGroupMovieBoolean) {
            if (movieId === "") {
              inputGroupMovieBoolean = false;
              $(".inputGroupMovieErr").text("*Please select movie name");
            }
          }
          if (!showDateTimeBoolean) {
            if (showDateTime === "") {
              showDateTimeBoolean = false;
              $(".showDateTimeErr").text("Please select show date & time");
            }
          } else if (
            inputGroupTheaterBoolean &&
            inputGroupMovieBoolean &&
            showDateTimeBoolean
          ) {
            $.post(
              "apiconfig/insertMovieShowDetail.php",
              {
                theaterId: theaterId,
                movieId: movieId,
                showDateTime: showDateTime,
              },
              function (result) {
                var result = JSON.parse(result);
                console.log(result);
                alert(result["message"]);
              }
            );
          }
        });

        for (let i of result["data"]) {
          if (
            i["table_name"] != "users" &&
            i["table_name"] != "movie_timing_details"
          ) {
            $("#tablesUl").append(`
        <li class="nav-item" id="${i["table_name"]}">
          <a class="nav-link fw-semibold" href="#" >${i[
            "table_name"
          ].toUpperCase()}</a>
        </li>
        `);
          }
        }

        let getTablesData = function (tablename,userId) {
          let searialNo = 1;
          let getTableBodyApendedData = function (data, searialNo) {
            for (let i of data) {
              var tableRow = `<td class="text-white fw-bold">${searialNo}</td>`;

              for (let j in i) {
                console.log(j);
                if (
                  j !== "movie_img_url" &&
                  j !== "theater location" &&
                  j !== "ticket price" &&
                  j !== "booking id"
                ) {
                  if (j === "show date time" && tablename === "bookings") {
                    var date = new Date(i[j]);
                    day = date.toLocaleString("en-US", { day: "2-digit" });
                    month = date.toLocaleString("en-US", { month: "2-digit" });
                    year = date.toLocaleString("en-US", { year: "numeric" });
                    time = date.toLocaleString("en-US", {
                      hourscycle: "h12",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    tableRow += `<td class="text-white fw-bold">${day}-${month}-${year} ${time}</td>`;
                  } else {
                    tableRow += `<td class="text-white fw-bold">${i[j]}</td>`;
                  }
                }
              }
              if (tablename === "bookings") {
                let movieImgUrl = i["movie_img_url"];
                let movieName = i["movie name"];
                let noOfSeats = i["no of seats"];
                let seatNumbers = i["seat numbers"];
                let showDateTime = i["show date time"];
                let theaterName = i["theater name"];
                let totalPrice = i["total price"];
                let theaterLocation = i["theater location"];
                let ticketPrice = i["ticket price"];
                let bookingId = i["booking id"];

                var date = new Date(showDateTime);
                let weekDay = date.toLocaleString("en-US", {
                  weekday: "short",
                });
                let day = date.toLocaleString("en-US", {
                  day: "2-digit",
                });
                let month = date.toLocaleString("en-US", {
                  month: "short",
                });
                let time = date.toLocaleString("en-US", {
                  hourscycle: "h12",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                tableRow += `<td ><!-- Button trigger modal -->
                <a  data-bs-toggle="modal" class="text-primary fw-normal" style="cursor:pointer;text-decoration:underline;" data-bs-target="#exampleModal${searialNo}">
                  view ticket
                </a>
                
                <!-- Modal -->
                <div class="modal fade text-black" id="exampleModal${searialNo}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ticket</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="movieDetailCard d-flex gap-4">
                          <img src=${movieImgUrl} class="movieImg rounded-3" alt="movie-img"/>
                          <div>
                            <h3>${movieName} (U/A)</h3>
                            <p class="m-0">${weekDay}, ${day} ${month} | ${time}</p>
                            <p class="m-0">${theaterName}|${theaterLocation}</p>
                          </div>
                        </div>
                        <div class="showDetailCard d-flex flex-row justify-content-between"> 
                          <p class="m-0 fw-semibold">${noOfSeats} Tickets(s)</p> 
                          <p class="m-0 fw-semibold">Seat numbers:${seatNumbers}</p>
                        </div>
                        <p class="m-0 text-secondary text-center">A confirmation is sent on e-mail/SMS/WhatsApp within 15 minutes of booking.</p>
                        <div class="totalAmountCard d-flex justify-content-between">
                          <div class="d-flex gap-3">
                            <div>
                              <p class="m-0 fw-bold">Booking Id</p>
                              <p class="m-0 fw-semibold">${bookingId}</p>
                            </div>
                            <div>
                              <p class="m-0 fw-bold">Movie name</p>
                              <p class="m-0 fw-semibold">${movieName}</p>
                            </div>
                          </div>
                          <div class="d-flex gap-2">
                            <div>
                              <p class="m-0 fw-bold">Qty</p>
                              <p class="m-0 fw-semibold">${noOfSeats}</p>
                            </div>
                            <div class="d-flex flex-column justify-content-end">
                              <p class="m-0 fw-bold">*</p>
                            </div>
                            <div>
                              <p class="m-0 fw-bold">price</p>
                              <p class="m-0 fw-semibold">${ticketPrice}</p>
                            </div>
                            <div>
                              <p class="m-0 fw-bold">Total amount</p>
                              <p class="m-0 fw-semibold">Rs.${totalPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="window.print()" >Print</button>
                      </div>
                    </div>
                  </div>
                </div></td>`;
              }

              $(".tableBodyCard").append(`
                <tr>
                ${tableRow}
                </tr>
              `);

              searialNo += 1;
            }
          };
          $.get(
            "apiconfig/tablesQueryData.php",
            { tablename: tablename,userId:userId },
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
                      <th scope="col" class="bg-white text-dark">SERIAL NO</th>            
                      </tr>
                    </thead>
                    <tbody class="tableBodyCard">
                    </tbody>
                  </table>
                </div>
              `);
              $("#searchInputEl").keyup(function () {
                $(".tableBodyCard").empty();
                let searialNo1 = 1;
                data = [];
                for (let i of result["data"]) {
                  for (let j in i) {
                    let text = String(i[j]).toLowerCase();
                    let compareText = $(this).val().toLowerCase();
                    if (text.includes(compareText)) {
                      data = [...data, i];
                      break;
                    }
                  }
                }
                getTableBodyApendedData(data, searialNo1);
              });
              for (let i in result["data"][0]) {
                if (
                  i !== "movie_img_url" &&
                  i !== "theater location" &&
                  i !== "ticket price" &&
                  i !== "booking id"
                ) {
                  $(".tableHeadCard")
                    .children()
                    .append(
                      `<th scope="col" class="bg-white text-dark">${i.toUpperCase()}</th>`
                    );
                }
              }
              if (tablename === "bookings") {
                $(".tableHeadCard")
                  .children()
                  .append(
                    `<th scope="col" class="bg-white text-dark">TICKET</th>`
                  );
              }
              getTableBodyApendedData(result["data"], searialNo);
            }
          );
        };
        $("#theaters").click(function () {
          getTablesData("theaters",result["user_details"]["id"]);
        });
        $("#customers").click(function () {
          getTablesData("customers",result["user_details"]["id"]);
        });
        $("#movies").click(function () {
          getTablesData("movies",result["user_details"]["id"]);
        });
        $("#bookings").click(function () {
          getTablesData("bookings",result["user_details"]["id"]);
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
              <p class="m-0 text-info fw-bold">${
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
