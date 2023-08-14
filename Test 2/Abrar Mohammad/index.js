$(document).ready(function () {
  $.get(
    "https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&apiKey=28f268b4ec714eaaa6f67de7b04d2db4",
    function (data, status) {
      let totalData = [];
      if (status === "success") {
        for (let i of data.articles) {
          totalData = [...totalData, i];
        }
      } else {
        console.log("error in the url");
      }
      let randomVal = Math.floor(Math.random() * totalData.length);
      $(".randomText").text(totalData[randomVal].title);
      $(".randomText").css({ fontSize: "14px", height: "20px", width: "100%" });
    }
  );
  $(".emailErrMsg").hide();
  $(".emailErrMsg").css({ color: "red", fontSize: "12px" });
  $(".cardError").hide();
  $(".cardError").css({ color: "red", fontSize: "12px" });
  $(".expiryErr").hide();
  $(".expiryErr").css({ color: "red", fontSize: "12px" });
  $(".cvvErr").hide();
  $(".cvvErr").css({ color: "red", fontSize: "12px" });

  $(".emailEle").blur(function (event) {
    if (event.target.value === "") {
      $(".emailErrMsg").show();
      $(".emailErrMsg").text("Enter Email");
    } else if (
      !event.target.value.endsWith(".com") ||
      !event.target.value.match(/[@]/)
    ) {
      $(this).val("");
      $(".emailErrMsg").show();
      $(".emailErrMsg").text("Enter Valid Username");
    } else {
      $(".emailErrMsg").hide();
    }
  });
  $(".cardEl").blur(function (event) {
    if (event.target.value === "") {
      $(".cardError").show();
    } else if (
      event.target.value.match(/d/) ||
      event.target.value.length < 16
    ) {
      $(".cardError").show();
      $(".cardError").text("Enter Valid Card Number");
    } else {
      $(".cardError").hide();
    }
  });

  $(".expiryEle").blur(function (event) {
    if (event.target.value === "") {
      $(".expiryErr").show();
    } else {
      $(".expiryErr").hide();
    }
  });

  $(".cvvEle").blur(function (event) {
    if (event.target.value === "") {
      $(".cvvErr").show();
    } else if (event.target.value.length < 3) {
      $(".cvvErr").show();
      $(".cvvErr").text("Please Enter 3 Digits");
      cvvNumErr = true;
    } else {
      $(".cvvErr").hide();
    }
  });

  let emailErr = true;
  let cardErr = true;
  let expiryDateErr = true;
  let cvvNumErr = true;
  function validateEmail() {
    let emailVal = $(".emailEle").val();
    if (emailVal.length === 0) {
      $(".emailErrMsg").show();
      emailErr = true;
    } else {
      $(".emailErrMsg").hide();
      emailErr = false;
    }
  }
  function validateCard() {
    let cardVal = $(".cardEl").val();

    if (cardVal.length === 0) {
      $(".cardError").show();
      cardErr = true;
    } else {
      $(".cardError").hide();
      cardErr = false;
    }
  }
  function validateExpiry() {
    let expiryVal = $(".expiryEle").val();

    if (expiryVal.length === 0) {
      $(".expiryErr").show();
      expiryDateErr = true;
    } else {
      $(".expiryErr").hide();
      expiryDateErr = false;
    }
  }

  function validateCvv() {
    let cvvVal = $(".cvvEle").val();

    if (cvvVal.length === 0) {
      $(".cvvErr").show();
      cvvNumErr = true;
    } else {
      $(".cvvErr").hide();
      cvvNumErr = false;
    }
  }

  $("#buttonEl").click(function () {
    validateEmail();
    validateCard();
    validateExpiry();
    validateCvv();
    if (
      emailErr === true ||
      cardErr === true ||
      expiryDateErr === true ||
      cvvNumErr === true
    ) {
      return true;
    } else {
      alert("success");
      $(".emailEle").val("");
      $(".cardEl").val("");
      $(".expiryEle").val("");
      $(".cvvEle").val("");
    }
  });

  $("#selectBtn1").click(function () {
    let subAmoValue = $("#subAmo").text($(".planAmount1").text());
    let totalValue =
      parseInt(subAmoValue.text().slice(1)) +
      parseInt($(".platformAmount").text().slice(1));
    $("#liItem1").text($(".planName1").text());
    $(".liItem1").css({ color: "black" });
    $("#liItem2").text($(".planName2").text());
    $(".liItem2").css({ color: "black" });
    $("#liItem3").text($(".planName3").text());
    $(".liItem3").css({ color: "black" });
    $("#liItem4").text($(".planName4").text());
    $(".liItem4").css({ color: "black" });
    $("#profPlan").text($(".basicPlanPara1").text());
    $("#profAmo").text($(".planAmount1").text() + "/ month");
    $("#totalAmo").text(`$ ${totalValue}`);
  });

  $("#selectBtn2").click(function () {
    let subAmoValue = $("#subAmo").text($(".planAmount2").text());
    let totalValue =
      parseInt(subAmoValue.text().slice(1)) +
      parseInt($(".platformAmount").text().slice(1));
    $("#liItem1").text($(".planName5").text());
    $("#liItem2").text($(".planName6").text());
    $("#liItem3").text($(".planName7").text());
    $("#liItem4").text($(".planName8").text());
    $("#profPlan").text($(".basicPlanPara2").text());
    $("#profAmo").text($(".planAmount2").text() + "/ month");
    $("#totalAmo").text(`$ ${totalValue}`);
  });

  $("#selectBtn3").click(function () {
    let subAmoValue = $("#subAmo").text($(".planAmount3").text());
    let totalValue =
      parseInt(subAmoValue.text().slice(1)) +
      parseInt($(".platformAmount").text().slice(1));
    $("#liItem1").text($(".planName9").text());
    $("#liItem2").text($(".planName10").text());
    $("#liItem3").text($(".planName11").text());
    $("#liItem4").text($(".planName12").text());
    $("#profPlan").text($(".basicPlanPara3").text());
    $("#profAmo").text($(".planAmount3").text() + "/ month");
    $("#totalAmo").text(`$ ${totalValue}`);
  });
});
