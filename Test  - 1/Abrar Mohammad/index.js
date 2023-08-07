$(document).ready(function () {
  let inputValue = document.getElementById("inputElement");
  let newDate = new Date();

  $("#inputElement").keypress(function (event) {
    let eventKey = event.keyCode;
    if (eventKey == 13) {
      $(".addingChild").append(
        `<div class = "addedContainer d-flex justify-content-between align-items-center me-5 ms-5 p-2 mb-3" ><div class = "d-flex align-items-center"> <i class="fa-solid fa-list-check text-success me-2"></i>
          <p class = "ipVal m-0"> ${
            inputValue.value
          } </p> </div> <p class = "ipVal m-0"> ${newDate.getDate()}-${newDate.toLocaleString(
          "en-us",
          { month: "long" }
        )}-${newDate.getFullYear()} </p> </div>`
      );
      inputValue.value = "";
    }
    $(".addedContainer").css({
      backgroundColor: "lightgray",
      borderRadius: "6px",
    });
    $(".ipVal").css({
      color: "green",
    });
  });
  $(".dateEl").text(
    `${newDate.getDate()}-${newDate.toLocaleString("en-us", {
      month: "long",
    })}-${newDate.getFullYear()}`
  );
  let countriesData = [];
  let colorsData = [];

  $.get("https://api.first.org/data/v1/countries", function (response, status) {
    for (let each in response) {
      let { AF, IN, AQ, AZ, EH, ER } = response[each];
      countriesData.push(AF, IN, AQ, AZ, EH, ER);
    }
    let slicedData = countriesData.slice(25, 31);
    for (let i in slicedData) {
      let { country, region } = slicedData[i];
      $(".countryCont").append(
        `<div class = "countryCard d-flex justfiy-content-center align-items-center p-5 mb-3 me-2 ms-2"> ${country} </div>`
      );
    }
    let colorValue = [
      "#474747",
      "#fff7bd",
      "#bfb35a",
      "#493736",
      "#cad7b2",
      "#542437",
      "#bef202",
      "#aa00ff",
    ];
    $.get(
      "https://random-flat-colors.vercel.app/api/random?count=20",
      function (response, status) {
        colorsData = [...response.colors];
        // for (let each of response.colors) {
        //   console.log(each);
        // }
        let randomVal =
          colorsData[Math.floor(Math.random() * colorsData.length)];
        colorValue.push(randomVal);
        console.log([...response.colors]);
      }
    );
    let randomVal = colorValue[Math.floor(Math.random() * colorValue.length)];
    $(".countryCard").css({ backgroundColor: `${randomVal}`, color: "white" });
  });
});
