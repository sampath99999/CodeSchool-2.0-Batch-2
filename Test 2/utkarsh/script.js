$(document).ready(function () {

    function loadData() {
        $.get(
          "https://serpapi.com/search.json?q=Apple&engine=google_images","https://serpapi.com/search.json?engine=google_images&q=Coffee",
          function (data, status) {
            if (status === "success") {
              displayImages(data.images_results);
              console.log(data);
            }
          }
        );
      }
  function displayImages(images) {
    const imagesData = $("#images");
    imagesData.empty();

    if (images.length > 0) {
      for (let i = 0; i < 16; i++) {
        const imageURL = images[i].original;

        imagesData.append(`
                    <div class="col-lg-3 col-md-4 col-6 mt-2 p-2">
                        <img src="${imageURL}" class="card-img-top" height="100%" width="100%">
                    </div>
                `);
      }
    } else {
      imagesData.text("No image results found.");
    }
  }



  function getImages(query) {
    const searchURL = `https://serpapi.com/search.json?engine=google_images&q=${query}`;

    $.get(searchURL, function (data, status) {
      if (status === "success") {
        displayImages(data.images_results);
      }
    });
  }

  loadData();

  $("#searchButton").click(function () {
    const query = $("#searchBox").val();

    if (query !== "") {
      getImages(query);
    }
  });

  $("#submitBtn").click(function () {
    let name = $("#name").val();
    let eMail = $("#eMail").val();
    let phnNum = $("#phnNum").val();
    let dateOfBirth = $("#dateOfBirth").val();

    if (name.length == 0) {
      $("#nameMessage").html("Enter your name");
      $("#nameMessage").css("color", "red");
    } else {
      $("#nameMessage").css("display", "none");
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (eMail.length == 0) {
      $("#mailMessage").html("Enter email");
      $("#mailMessage").css("color", "red");
    } else if (!emailRegex.test(eMail)) {
      $("#mailMessage").html("Invalid email format.");
      $("#mailMessage").css("color", "red");
    } else {
      $("#mailMessage").css("display", "none");
    }

    let phnNumRegex = /^[9]\d{9}$/;
    if (phnNum.length == 0) {
      $("#phoneNumber").html("Enter phone number.");
      $("#phoneNumber").css("color", "red");
    } else if (!phnNumRegex.test(phnNum)) {
      $("#phoneNumber").html("Invalid phone number format.");
      $("#phoneNumber").css("color", "red");
    } else {
      $("#phoneNumber").css("display", "none");
    }
    let dateOfBirthRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (dateOfBirth.length == 0) {
      $("#dateofbirth").html("Enter your date of birth");
      $("#dateofbirth").css("color", "red");
    } else if (!dateOfBirthRegex.test(dateOfBirth)) {
      $("#dateofbirth").html("Invalid dob format. please enter in dd/mm/yyyy format");
      $("#dateofbirth").css("color", "red");
    }
    else {
      $("#dateofbirth").css("display", "none");
    }
  });

});
