$(document).ready(function () {
    var currentPage = 1;
  
    $("#nextPageOne").click(function () {
      $("#fstPage").hide();
      $("#scdPage").show();
      currentPage = 2;
    });
  
    $("#nextPageTwo").click(function () {
      $("#scdPage").hide();
      $("#trdPage").show();
      currentPage = 3;
    });
  
    if (currentPage === 3) {
      $.get({
        url: "https://api.chucknorris.io/jokes/random",
        success: function (data) {
          const { value } = data;
          $("#jokesPlace").append(`
              <div>
                <p>${value}</p>
              </div>
            `);
        },
        error: function () {
          $("#displayError").append(
            `<h4 class="bg-opacity-10">Error loading data...!</h4><img class="errorImage opacity-75 rounded-circle" src="images/errorImage.jpg" alt="Error Image">`
          );
        },
      });
    }
  
    $("#nextPageThree").click(function () {
      $("#trdPage").hide();
      $("#fstPage").show();
      currentPage = 1;
    });
  });
  
   
  
  