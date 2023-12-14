$(document).ready(function () {
  var token = localStorage.getItem("token");
  $.post("api/getuser.php", { token: token }, function (result) {
    try {
      var resultObj = JSON.parse(result.trim());
      if (!resultObj.status) {
        alert(resultObj.message);
      } else {
        $("#welcomeMsg").text(resultObj.data);
        $("#userEmail").text("(" + resultObj.message + ")");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("An error occurred:", errorThrown);
  });

  $("#logoutBtn").click(function () {
    var token = localStorage.getItem("token");
    $.post("api/logout.php", { token: token }, function (result) {}).fail(
      function (jqXHR, textStatus, errorThrown) {
        console.error("An error occurred:", errorThrown);
      }
    );
    localStorage.removeItem("token");
    window.location.replace("login.html");
  });
  $.post("api/getrole.php", { token: token }, function (result) {
    var result = JSON.parse(result);
    if (result.data == "admin") {
      $("#addBtn").html(
        `<div class="btn rounded-circle text-white bg-primary  float-end fs-1 p-0 px-3 me-5">+</div>`
      );
    } else {
      $("#addBtn").html(``);
      $("#addBtn").empty();
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("An error occurred:", errorThrown);
  });

  $.get("api/getproducts.php", function (response) {
    var result = JSON.parse(response);
    $("#products").empty();
    for (let product of result) {
      const {
        rating,
        product_name,
        reviews,
        mrp,
        selling_price,
        image_link,
        product_size,
      } = product;
      var filepath = "api/uploads/" + `${image_link}`;
      $("#products").append(
        `
      <div class="card col-12 offset-md-2 col-md-8 my-3">
      <div class="card-body">
      <div class="d-flex gap-5">
      <div class="productImage">
      <img class="img-fluid" src="` +
          filepath +
          `" alt="product Image"/>
      </div>
      <div class="w-100">
      <div class="d-flex">
      <h4>${product_name}</h4>
      </div>
      <div class="d-flex">
      <span>${rating} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#008000" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/></svg></span><span class="text-secondary text-opacity-10 fw-bolder">| ${reviews} reviews</span>
      </div>
      <div class="d-md-flex justify-content-between my-2">
      <div>size: <div class="btn border-2 border-secondary rounded-2">${product_size}</div></div>
      <div class="d-flex float-md-end"><del>$` +
          `${mrp}` +
          `.00</del><span class="ms-3 fw-bolder">$` +
          `${selling_price}` +
          `.00</span></div>
      </div>
      </div>
      </div>
      </div>
      </div>`
      );
    }
  });

  $(document).on("click", "#addBtn", function () {
    $("#products").empty();
    $("#products").append(`
    <div class="offset-3 col-6 mt-5">
    <div class="card">
        <div class="card_header">
        <h3 class="text-center">Add Product</h3>
        </div>
        <div class="card-body">
            <input type="file" class="form-control" placeholder="upload image" id="imageUploaded"/>
            <div id="fileErr" class="mb-3 text-danger"></div>
            <div class="form-floating">
            <input type="text" class="form-control" id="productName" placeholder="">
            <label for="productName">Product Name</label>
            </div>
            <div id="productErr" class="mb-3 text-danger"></div>
            <div class="form-floating">
            <input type="text" class="form-control" id="reviews" placeholder="">
            <label for="reviews">NO of Reviews</label>
            </div>
            <div id="reviewsErr" class="mb-3 text-danger"></div>
            <select id="size" class="form-select">
            <option value="">select size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            </select>
            <div id="sizeErr" class="mb-3 text-danger"></div>
            <div class="form-floating">
            <input type="text" class="form-control" id="rating" placeholder="">
            <label for="mrp">Rating</label>
            </div>
            <div id="ratingErr" class="mb-3 text-danger"></div>
            <div class="form-floating">
            <input type="text" class="form-control" id="mrp" placeholder="">
            <label for="mrp">MRP</label>
            </div>
            <div id="mrpErr" class="mb-3 text-danger"></div>
            <div class="form-floating">
            <input type="text" class="form-control" id="sellingPrice" placeholder="">
            <label for="sellingPrice">Selling Price</label>
            </div>
            <div id="sellingPriceErr" class="mb-3 text-danger"></div>
            <div class="btn bg-primary text-white rounded-2 float-end" id="insertBtn">add</div>
        </div>
    </div>
    </div>`);
  });

  $(document).on("input", "#reviews", function () {
    var inputVal = $(this).val();
    var numericVal = inputVal.replace(/[^0-9]/g, "");
    $(this).val(numericVal);
  });
  $(document).on("input", "#mrp", function () {
    var inputVal = $(this).val();
    var numericVal = inputVal.replace(/[^0-9]/g, "");
    $(this).val(numericVal);
  });
  $(document).on("input", "#sellingPrice", function () {
    var inputVal = $(this).val();
    var numericVal = inputVal.replace(/[^0-9]/g, "");
    $(this).val(numericVal);
  });
  $(document).on("input", "#rating", function () {
    var inputVal = $(this).val();
    var numericVal = inputVal.replace(/[^0-9.]/g, "");
    $(this).val(numericVal);
  });

  $(document).on("click", "#insertBtn", function () {
    var imageUploaded = $("#imageUploaded").val().trim();
    var productName = $("#productName").val().trim();
    var reviews = $("#reviews").val().trim();
    var mrp = $("#mrp").val().trim();
    var sellingPrice = $("#sellingPrice").val().trim();
    var size = $("#size").val();
    var rating = $("#rating").val();
    var flag = 1;
    var extensions = ["png", "jpeg", "jpg"];
    var fileArr = imageUploaded.split(".");
    fileArr[1] = fileArr[1].toLowerCase();
    var supportedFile = false;
    for (let extension of extensions) {
      if (extension == fileArr[1]) {
        supportedFile = true;
        break;
      }
    }
    if (imageUploaded.length == 0) {
      $("#fileErr").html(`please upload file`);
      flag = 0;
    } else if (!supportedFile) {
      $("#fileErr").html(
        `please upload file either in 'png' or 'jpeg' or 'jpg'`
      );
      flag = 0;
    } else {
      $("#fileErr").html(``);
    }
    if (productName.length == 0) {
      $("#productErr").html(`please enter product name`);
      flag = 0;
    } else {
      $("#productErr").html(``);
    }
    if (rating.length == 0) {
      $("#ratingErr").html(`please enter rating`);
      flag = 0;
    } else {
      $("#ratingErr").html(``);
    }
    if (reviews.length == 0) {
      $("#reviewsErr").html(`please enter reviews`);
      flag = 0;
    } else {
      $("#reviewsErr").html(``);
    }
    if (mrp.length == 0) {
      $("#mrpErr").html(`please enter mrp`);
      flag = 0;
    } else {
      $("#mrpErr").html(``);
    }
    if (sellingPrice.length == 0) {
      $("#sellingPriceErr").html(`please enter selling price`);
      flag = 0;
    } else {
      $("#sellingPriceErr").html(``);
    }
    if (size.length == 0) {
      $("#sizeErr").html(`please select size`);
      flag = 0;
    } else {
      $("#sizeErr").html(``);
    }

    if (flag) {
      var imageUploaded = $("#imageUploaded")[0].files[0];
      var formData = new FormData();
      formData.append("imageUploaded", imageUploaded);
      formData.append("productName", productName);
      formData.append("reviews", reviews);
      formData.append("mrp", mrp);
      formData.append("sellingPrice", sellingPrice);
      formData.append("size", size);
      formData.append("rating", rating);

      $.ajax({
        type: "POST",
        url: "api/addProduct.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          var result = JSON.parse(response);
          if (result["status"]) {
            window.location.reload("home.html");
          } else {
            alert(result["message"]);
          }
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    }
  });
});
