$(document).ready(function () {
  var amount = "";
  $(".amount").click(function () {
    var id = $(this).attr("id");
    var ids = ["twenty", "fifty", "hundred", "twoHundred", "fiveHundred"];
    for (let elementId of ids) {
      if (id != elementId) {
        $("#" + elementId).attr(
          "class",
          "btn amount btn-outline-secondary p-2"
        );
      }
    }
    $(this).attr(
      "class",
      "btn btn-outline-secondary p-2 bg-primary text-white"
    );
    amount = $(this).attr("value");
    $("#customAmount").attr("disabled", "disabled");
  });

  $("#loginBtn").click(function () {
    window.location.replace("./login.html");
  });

  $("#nextBtn").click(function () {
    var donateForm = {
      amount: "",
      cause: $("#cause").val(),
      gift: $("#dedicate").val().trim(),
    };
    var flag = 1;
    if ($("#comment").is(":not(:checked)")) {
      $("#checkError").html(`Please check the comment`);
      flag = 0;
    } else {
      $("#checkError").html(``);
    }
    var disableStatus = $("#customAmount").attr("disabled");
    if (disableStatus == "disabled") {
      donateForm.amount = parseInt(amount);
      $("#customAmountError").html(``);
    } else {
      var customAmount = $("#customAmount").val().trim();
      if (customAmount.length == 0) {
        $("#customAmountError").html(`Enter custom amount`);
        flag = 0;
      } else {
        $("#customAmountError").html(``);
        donateForm.amount = parseInt(customAmount);
      }
    }
    if (donateForm.cause.length == 0) {
      $("#causeError").html(`Please select cause`);
      flag = 0;
    } else {
      $("#causeError").html(``);
    }
    if (donateForm.gift.length == 0) {
      $("#dedicateError").html(`Enter dedicate gift to`);
      flag = 0;
    } else {
      $("#dedicateError").html(``);
    }
    if (flag == 1) {
      $.post("api/insertdonation.php", donateForm, function (response) {
        var response = JSON.parse(response);
        alert(response["message"]);
      }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An api error occurred:" + errorThrown);
      });
    }
  });
});
