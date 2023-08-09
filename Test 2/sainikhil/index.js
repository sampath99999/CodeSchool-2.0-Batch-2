$(document).ready(function () {

  $("#UserName").on("keyup", function () {
    var userName = $("#UserName").val();
    
    if (userName.length < 8) {
      $("#CheckUserName")
        .html("User name must be minimum 8 characters")
        .css("color", "red");
        
      
    } else {
      $("#CheckUserName").html("");
     
    }
  });

  $("#ConfirmPassword").on("keyup", function () {
    var password = $("#Password").val();
    var confirmPassword = $("#ConfirmPassword").val();
    if (password != confirmPassword){
      $("#CheckPasswordMatch")
        .html("Password does not match !")
        .css("color", "red");
          
        }
    else{
      $("#CheckPasswordMatch").html("Password match !").css("color", "green");
       
       }
});
  $(function () {
    $("#phonenumber").on("keyup", function () {
      var regex = /^(0|91)?[9][0-9]{9}$/;
      if (regex.test($("#phonenumber").val())) {
        $("#CheckMobile").css("visibility", "hidden");
      
      } else {
        $("#CheckMobile").css("visibility", "visible");
        
      }
    });
  });
  
  $(".WeatherIcons").css("display","none");
  $("#temparatureToggler").css("display","none");
  $("#forecast").css("display","none");

  $("#CountryBtn").click(function () {
    $("#Temparature").empty();
    $("#Wind").empty();
    $("#Rain").empty();
    $("#Humidity").empty();
    $("#DayNightIcon").empty();
    $("#Info").empty();

    country = $("#Country").val();
    const api = `http://api.weatherapi.com/v1/current.json?key=9e0ba824962f471bbee84246230708&q=${country}&aqi=no`;

    $.get(api, function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);

      console.log(data);

      $(".WeatherIcons").css("display","block");
      $("#temparatureToggler").css("display","flex");
      $("#forecast").css("display","block");
      $("#Temparature").append(data.current.temp_f);
      $("#faranheit").css("font-weight","900");
      $("#celcius").css("font-weight","200");

      $("#Wind").append(`${data.current.wind_mph}mph`);
      $("#Rain").append(`${data.current.precip_mm}mm`);
      $("#Humidity").append(`${data.current.humidity} %`);
      $("#faranheit").on('click',function(){
        $("#celcius").css("font-weight","200");
        $("#Temparature").empty();
        $("#Temparature").append(data.current.temp_f);
        $("#faranheit").css("font-weight","900");
      })
      $("#celcius").on('click',function(){
        $("#faranheit").css("font-weight","200");
        $("#Temparature").empty();
        $("#Temparature").append(data.current.temp_c);
        $("#celcius").css("font-weight","900");
      })
      $("#Info").append(`Feels Like ${data.current.feelslike_c} C`);
      if (data.current.is_day) {
        $("#DayNightIcon").append(`<i class="fa-regular fa-sun"></i>`);
      } else {
        $("#DayNightIcon").append(
          `<i class="fa-solid fa-moon text-secondary opacity-50"></i>`
        );
      }
    });
  });
});
