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
          $.post("apiconfig/logout.php",{userId:result["user_details"]},function(){})
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
                if (result["status"]) {
                  alert(result["message"]);
                } else {
                  alert(result["message"]);
                }
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

        var getOptionsTableData = function (userId) {
          $("#inputGroupTheater")
            .empty()
            .append("<option selected value=''>Choose theater name</option>");
          $("#inputGroupMovie")
            .empty()
            .append('<option selected value="">Choose movie name</option>');
          $.get(
            "apiconfig/addMovieTablesData.php",
            { userId: userId },
            function (result) {
              var result = JSON.parse(result);
              if (result["status"]) {
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
              } else {
                console.log(result["message"]);
              }
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
            let currentDate = new Date();
            let showDate = new Date(showDateTime);
            if (showDate > currentDate) {
              $.post(
                "apiconfig/insertMovieShowDetail.php",
                {
                  theaterId: theaterId,
                  movieId: movieId,
                  showDateTime: showDateTime,
                },
                function (result) {
                  var result = JSON.parse(result);
                  alert(result["message"]);
                }
              );
            } else {
              alert("Show date time must be greater than present date & time.");
            }
          }
        });

        // Add booking card

        var getBookingTablesList = function () {
          $("#bookingTheaterList")
            .empty()
            .append("<option selected value=''>Choose theater name</option>");
          $("#bookingMovieList")
            .empty()
            .append("<option selected value=''>Choose movie name</option>");
          $("#bookingDateList")
            .empty()
            .append("<option selected value=''>Choose show date</option>");
          $("#bookingTimeList")
            .empty()
            .append("<option selected value=''>Choose show time</option>");
          $("#ticketQuantity").val("");
          $("#ticketPriceEl").val("");
          $("#totalPrice").val("");
          $(".bookingTheaterListErr").text("");
          $(".bookingMovieListErr").text("");
          $(".bookingDateListErr").text("");
          $(".bookingTimeListErr").text("");
          $(".ticketQuantityErr").text("");
          $.get("apiconfig/addBookingTheatersList.php", function (result) {
            var result = JSON.parse(result);
            if (result["status"]) {
              $.each(result["data"], function (index, value) {
                $("#bookingTheaterList").append(
                  `<option value=${value["id"]}>${value["theater_name"]}</option>`
                );
              });
            } else {
              console.log(result["message"]);
            }
          });
        };

        // booking theater el

        let bookingTheaterBoolean = false;
        $("#bookingTheaterList").blur(function () {
          $("#bookingMovieList")
            .empty()
            .append("<option selected value=''>Choose movie name</option>");
          $("#bookingDateList")
            .empty()
            .append("<option selected value=''>Choose show date</option>");
          $("#bookingTimeList")
            .empty()
            .append("<option selected value=''>Choose show time</option>");
          let theaterId = $(this).val();
          if ($(this).val() === "") {
            bookingTheaterBoolean = false;
            $(".bookingTheaterListErr").text("*Please choose theater");
          } else {
            bookingTheaterBoolean = true;
            $("#bookingTheaterListErr").text("");
            $.get(
              "apiconfig/addBookingMoviesList.php",
              { theaterId: theaterId },
              function (result) {
                var result = JSON.parse(result);
                if (result["status"]) {
                  $.each(result["data"], function (index, value) {
                    $("#bookingMovieList").append(
                      `<option value=${value["id"]}>${value["movie_name"]}</option>`
                    );
                  });
                } else {
                  console.log(result["message"]);
                }
              }
            );
            $.get(
              "apiconfig/addBookingTicketPrice.php",
              { theaterId: theaterId },
              function (result) {
                var result = JSON.parse(result);
                if (result["status"]) {
                  $("#ticketPriceEl").val(result["data"]["ticket_price"]);
                } else {
                  console.log(result["message"]);
                }
              }
            );
          }
        });

        // bookingMovieList
        let bookingMovieListBoolean = false;
        $("#bookingMovieList").blur(function () {
          $("#bookingDateList")
            .empty()
            .append("<option selected value=''>Choose show date</option>");
          $("#bookingTimeList")
            .empty()
            .append("<option selected value=''>Choose show time</option>");
          let moveId = $(this).val();
          let theaterId = $("#bookingTheaterList").val();
          if (moveId === "") {
            bookingMovieListBoolean = false;
            $(".bookingMovieListErr").text("*Please choose an movie");
          } else {
            bookingMovieListBoolean = true;
            $(".bookingMovieListErr").text("");
            $.get(
              "apiconfig/addBookingDatesList.php",
              { movieId: moveId, theaterId: theaterId },
              function (result) {
                var result = JSON.parse(result);
                if (result["status"]) {
                  let currentDate = new Date();
                  let currentDay = currentDate.toLocaleString("en-us", {
                    day: "2-digit",
                  });
                  let currentMonth = currentDate.toLocaleString("en-us", {
                    month: "2-digit",
                  });
                  let currentYear = currentDate.toLocaleString("en-us", {
                    year: "numeric",
                  });
                  $.each(result["data"], function (index, value) {
                    let showDate = new Date(value["show_date_time"]);
                    let showDay = showDate.toLocaleString("en-us", {
                      day: "2-digit",
                    });
                    let showMonth = showDate.toLocaleString("en-us", {
                      month: "2-digit",
                    });
                    let showYear = showDate.toLocaleString("en-us", {
                      year: "numeric",
                    });
                    if (
                      `${showYear}-${showMonth}-${showDay}` >=
                      `${currentYear}-${currentMonth}-${currentDay}`
                    ) {
                      $("#bookingDateList").append(
                        `<option value=${value["show_date_time"]}>${value["show_date_time"]}</option>`
                      );
                    }
                  });
                } else {
                  console.log(result["message"]);
                }
              }
            );
          }
        });

        // bookingDateList
        let bookingDateListBoolean = false;
        $("#bookingDateList").blur(function () {
          $("#bookingTimeList")
            .empty()
            .append("<option selected value=''>Choose show time</option>");
          let theaterId = $("#bookingTheaterList").val();
          let movieId = $("#bookingMovieList").val();
          let date = $(this).val();
          if (date === "") {
            bookingDateListBoolean = false;
            $(".bookingDateListErr").text("*Please choose date");
          } else {
            bookingDateListBoolean = true;
            $(".bookingDateListErr").text("");
            $.get(
              "apiconfig/addBookingTimesList.php",
              { theaterId: theaterId, movieId: movieId, date: date },
              function (result) {
                var result = JSON.parse(result);
                if (result["status"]) {
                  let currentDate = new Date();
                  let currentHours = currentDate.toLocaleString("en-us", {
                    hour: "2-digit",
                  });
                  let currentMinutes = currentDate.toLocaleString("en-us", {
                    minute: "2-digit",
                  });
                  $.each(result["data"], function (index, value) {
                    let showTime = new Date(value["time"]);
                    let showHours = showTime.toLocaleString("en-us", {
                      hourCycle: "h24",
                      hour: "2-digit",
                    });
                    let showMinutes = showTime.toLocaleString("en-us", {
                      minute: "2-digit",
                    });
                    if (showTime > currentDate) {
                      $("#bookingTimeList").append(
                        `<option value=${showHours}:${showMinutes}>${showHours}:${showMinutes}</option>`
                      );
                    }
                  });
                } else {
                  console.log(result["message"]);
                }
              }
            );
          }
        });

        // bookingTimeList
        let bookingTimeListBoolean = false;
        $("#bookingTimeList").blur(function () {
          if ($(this).val() === "") {
            bookingTimeListBoolean = false;
            $(".bookingTimeListErr").text("*Please choose time");
          } else {
            bookingTimeListBoolean = true;
            $(".bookingTimeListErr").text("");
          }
        });

        // ticketQuantity
        let ticketQuantityBoolean = false;
        $("#ticketQuantity").blur(function () {
          if ($(this).val() === "") {
            ticketQuantityBoolean = false;
            $(".ticketQuantityErr").text("*Please enter quantity");
          } else {
            ticketQuantityBoolean = true;
            $(".ticketQuantityErr").text("");
            $("#totalPrice").val($(this).val() * $("#ticketPriceEl").val());
          }
        });

        $("#addBookingBtn").click(function () {
          let theaterId = $("#bookingTheaterList").val();
          let movieId = $("#bookingMovieList").val();
          let date = `${$("#bookingDateList").val()} ${$(
            "#bookingTimeList"
          ).val()}`;
          let quantity = $("#ticketQuantity").val();
          let totalPrice = $("#totalPrice").val();
          let userId = result["user_details"]["id"];
          if (!bookingTheaterBoolean) {
            bookingTheaterBoolean = false;
            $(".bookingTheaterListErr").text("*Please choose theater");
          }
          if (!bookingMovieListBoolean) {
            bookingMovieListBoolean = true;
            $(".bookingMovieListErr").text("*Please choose an movie");
          }
          if (!bookingDateListBoolean) {
            bookingDateListBoolean = false;
            $(".bookingDateListErr").text("*Please choose date");
          }
          if (!bookingTimeListBoolean) {
            bookingTimeListBoolean = false;
            $(".bookingTimeListErr").text("*Please choose time");
          }
          if (!ticketQuantityBoolean) {
            ticketQuantityBoolean = false;
            $(".ticketQuantityErr").text("*Please enter quantity");
          } else if (
            bookingTheaterBoolean &&
            bookingMovieListBoolean &&
            bookingDateListBoolean &&
            bookingTimeListBoolean &&
            ticketQuantityBoolean
          ) {
            $.post(
              "apiconfig/insertBookingData.php",
              {
                theaterId: theaterId,
                movieId: movieId,
                date: date,
                quantity: quantity,
                totalPrice: totalPrice,
                userId: userId,
              },
              function (result) {
                var result = JSON.parse(result);
                alert(result["message"]);
              }
            );
          }
        });

        $("#addBooking").click(function () {
          getBookingTablesList();
        });

        for (let i of result["data"]) {
          if (
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

        let getTablesData = function (tablename, userId) {
          let searialNo = 1;
          let getTableBodyApendedData = function (data, searialNo) {
            for (let i of data) {
              var tableRow = `<td class="text-white fw-bold">${searialNo}</td>`;

              for (let j in i) {
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
                let noOfSeats = i["quantity"];
                let showDateTime = i["show date time"];
                let theaterName = i["theater name"];
                let totalPrice = i["total price"];
                let theaterLocation = i["theater location"];
                let ticketPrice = i["ticket price"];
                let bookingId = i["booking id"];
                let customerName = i["customer name"];

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
                          <p class="m-0 fw-semibold">CustomerName:${customerName}</p>
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
            "apiconfig/homeTablesData.php",
            { tablename: tablename, userId: userId },
            function (result) {
              var result = JSON.parse(result);
              if (result["status"]) {
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
              } else {
                console.log(result["message"]);
              }
            }
          );
        };
        $("#theaters").click(function () {
          getTablesData("theaters", result["user_details"]["id"]);
        });
        $("#users").click(function () {
          getTablesData("users", result["user_details"]["id"]);
        });
        $("#movies").click(function () {
          getTablesData("movies", result["user_details"]["id"]);
        });
        $("#bookings").click(function () {
          getTablesData("bookings", result["user_details"]["id"]);
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
