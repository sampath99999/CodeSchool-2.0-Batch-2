const apiKey = "686bb6f82b22474781c72118232806";

const url =
  "http://api.weatherapi.com/v1/forecast.json?key=686bb6f82b22474781c72118232806&q=germany&days=8&aqi=no&alerts=no";

let input = document.getElementById("countryInput");
input.value = "germany";

// default request
$.get(url, "GET", function (data) {
  console.log("Using Get Method", data);
  showData(data);
  futureForecast(data);
});

let weatherIcon,
  todaysCondition,
  todaysTemp,
  todaysMintemp,
  todaysMaxtemp,
  windspeed,
  chanceOfRain,
  humidity;

let icon2, dayTwoMinTemp, dayTwoMaxTemp;
let icon3, dayThreeMinTemp, dayThreeMaxTemp;

//request based on user Query
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let url = `http://api.weatherapi.com/v1/forecast.json?key=686bb6f82b22474781c72118232806&q=${input.value}&days=8&aqi=no&alerts=no`;
    console.log(url);

    $.get(url, "GET", function (data) {
      console.log("Using Get Method", data);
      showData(data);
      futureForecast(data);
    });
  }
});

let weatherIconElement = $("#weatherIcon");
let todaysTempElement = $("#todaysTemp");
let minTempElement = $("#minTemp");
let maxTempElement = $("#maxTemp");
let windSpeedElement = $("#windSpeed");
let chanceOfRainElement = $("#chanceOfRain");
let humidityElement = $("#humidity");
let todayConditionElement = $("#todaysCondition");

function showData(data) {
  console.log(data.current.condition.icon);
  console.log(data.current.condition.text);
  console.log(data.current.feelslike_f);
  console.log(data.current.temp_f);

  console.log(data.current.wind_mph);
  console.log(data.current.humidity);

  weatherIcon = data.current.condition.icon;
  todaysCondition = data.current.condition.text;
  todaysTemp = data.current.feelslike_f;
  todaysMintemp = data.forecast.forecastday[0].day.mintemp_f;
  todaysMaxtemp = data.forecast.forecastday[0].day.maxtemp_f;

  windspeed = data.current.wind_mph;
  humidity = data.current.humidity;
  chanceOfRain = 0;

  todaysTempElement.text(todaysTemp);
  minTempElement.text(todaysMintemp);
  maxTempElement.text(todaysMaxtemp);
  windSpeedElement.text(windspeed);
  chanceOfRainElement.text(chanceOfRain);
  humidityElement.text(humidity);
  weatherIconElement.attr("src", weatherIcon);
  todayConditionElement.text(todaysCondition);
}

function futureForecast(data) {
  let mintemp1 = $("#minTemp1");
  let mintemp2 = $("#minTemp2");
  let mintemp3 = $("#minTemp3");

  let maxtemp1 = $("#maxTemp1");
  let maxtemp2 = $("#maxTemp2");
  let maxtemp3 = $("#maxTemp3");

  mintemp1.text(data.forecast.forecastday[0].day.mintemp_f);

  maxtemp1.text(data.forecast.forecastday[0].day.maxtemp_f);

  mintemp2.text(data.forecast.forecastday[1].day.mintemp_f);

  maxtemp2.text(data.forecast.forecastday[1].day.maxtemp_f);

  mintemp3.text(data.forecast.forecastday[2].day.mintemp_f);

  maxtemp3.text(data.forecast.forecastday[2].day.maxtemp_f);

  console.log("data forecast", data.forecast.forecastday[0].day.condition.icon);

  $("#tempIcon").attr("src", data.forecast.forecastday[0].day.condition.icon);

  $("#tempIcon2").attr("src", data.forecast.forecastday[1].day.condition.icon);

  $("#tempIcon3").attr("src", data.forecast.forecastday[2].day.condition.icon);
}
