$(document).ready(function () {
  var userToken = localStorage.getItem("access_token");
  if (!userToken) {
    window.location.href = "login.html";
  }
  $(".amountValue").click(function () {
    $("#customValue").val($(this).text());
  });

  $("#nextBtn").click(function () {
    alert("Click On Donate Button");
  });

  $(".cardPayment").empty();
  $("#paymentEl").blur(function () {
    $(".paymentValCont").empty();

    if ($(this).val() === "UPI") {
      $(".paymentValCont").append(`<div class="upiPay d-flex flex-column mb-4">
      <label for="upiElement">UPI Number</label>
      <input type="text" class="upiEl" id="upiElement" />
    </div>`);
      $(".cardPayment").empty();
    } else if ($(this).val() === "Credit Card") {
      $(".paymentValCont")
        .append(`<div class="cardPayment d-flex flex-column mb-4">
      <label for="creditCardEl">Card Number</label>
      <input
        id="creditCardEl"
        type="tel"
        inputmode="numeric"
        pattern="[0-9\s]{13,19}"
        autocomplete="cc-number"
        maxlength="19"
        placeholder="xxxx xxxx xxxx xxxx"
      />
    </div>`);
    }
  });
  $(".nameErr").hide();
  $(".nameErr").css({ color: "red", fontSize: "12px" });
  $(".amountErr").hide();
  $(".amountErr").css({ color: "red", fontSize: "12px" });
  $(".causeErr").hide();
  $(".causeErr").css({ color: "red", fontSize: "12px" });
  $(".paymentErr").hide();
  $(".paymentErr").css({ color: "red", fontSize: "12px" });
  $("#nameEl").blur(function () {
    if ($(this).val().length === 0) {
      $(".nameErr").show();
    } else {
      $(".nameErr").hide();
    }
  });
  $("#customValue").blur(function () {
    if ($(this).val().length === 0) {
      $(".amountErr").show();
    } else {
      $(".amountErr").hide();
    }
  });

  $("#causeEl").blur(function () {
    if ($(this).val().length === "") {
      $(".causeErr").show();
    } else {
      $(".causeErr").hide();
    }
  });
  $("#paymentEl").blur(function () {
    if ($(this).val().length === "") {
      $(".paymentErr").show();
    } else {
      $(".paymentErr").hide();
    }
  });

  $("#donateBtn").click(function () {
    var nameEl = $("#nameEl").val();
    var customAmount = $("#customValue").val();
    var causeEl = $("#causeEl").val();
    var paymentType = $("#paymentEl").val();
    var paymentVal = "";
    var upiValue = $("#upiElement").val();
    var cardNumber = $("#creditCardEl").val();
    if (paymentType === "UPI") {
      paymentVal = upiValue;
    } else if (paymentType === "Credit Card") {
      paymentVal = cardNumber;
    }

    var amountVal = parseInt(customAmount.substr(1, 3));

    $.post(
      "http://localhost/donations/apiconfig/donation.php",
      {
        name: nameEl,
        amount: amountVal,
        cause: causeEl,
        payment_type: paymentType,
        card_number: paymentVal,
      },
      function (res) {
        var res = JSON.parse(res);
        if (res.status === true) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      }
    );
  });
  $(".donationCont").show();
  $("#navCont").show();
  $(".donationData").empty();
  $("#dashboardEl").click(function () {
    $(".donationCont").empty();
    $("#navCont").hide();
    $(".donationData").append(`<div class = "sideBarCont">
    <div class = "displayHead d-flex align-items-center justify-content-between d-none d-md-flex">
      <p class = "name m-0 text-light fw-bold">Donations</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list text-light fw-bold" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
      </div>
      <div class = "adminIcon d-flex flex-column justify-content-center align-items-center mb-5 d-none d-md-flex">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle text-warning" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg>
  <p class = "m-0 userName text-light">Admin Name</p>
      </div>
      <div class = "lists">
      <ul class = "unordered p-0">
      <li class = "text-light p-2 d-flex align-items-center" id = "homeEl">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house me-4 d-none d-md-flex" viewBox="0 0 16 16">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
  </svg>
  <p class = "m-0">Home</p>
      </li>
      <li class = "text-light p-2 d-flex align-items-center" id = "donationEl">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box me-4 d-none d-md-flex" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>
  <p class = "m-0">Donations</p>
    </li>
    </ul>
    </div>
    </div> <div class = "dataCont">
   
    </div>`);
    $("#homeEl").click(function () {
      $(".dataCont").empty();
      $.get(
        "http://localhost/donations/apiconfig/getamount.php",
        function (resData) {
          var resData = JSON.parse(resData);
          for (let each of resData.data) {
            $(".tableData").append(` <tr>
            <td>${each.total_members}</td>
            <td>${each.total_amount}</td>
          </tr>`);
          }
        }
      );
      $(
        ".dataCont"
      ).append(` <table class="table table-striped-columns table-hover table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Members Count</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody class = "tableData">
          </tbody>
        </table>`);
    });
    $("#donationEl").click(function () {
      $(".dataCont").empty();

      $.get(
        "http://localhost/donations/apiconfig/getdonations.php",
        function (resData) {
          var resData = JSON.parse(resData);
          for (let each of resData.data) {
            $(".tableData").append(` <tr>
            <td>${each.name}</td>
            <td>${each.amount}</td>
            <td>${each.cause}</td>
            <td>${each.payment_type}</td>
            <td>${each.card_number}</td>
          </tr>`);
          }
        }
      );
      $(
        ".dataCont"
      ).append(` <table class="table table-striped-columns table-hover table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Cause</th>
              <th scope="col">payment_type</th>
              <th scope="col">card_number</th>
            </tr>
          </thead>
          <tbody class = "tableData">
          </tbody>
        </table>`);
    });
  });
});
