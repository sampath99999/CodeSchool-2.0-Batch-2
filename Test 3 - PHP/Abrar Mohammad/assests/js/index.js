$(document).ready(function () {
  $.get("./api/getPosts.php", function (response) {
    var response = JSON.parse(response);
    if (response.status) {
      for (let each of response.data) {
        var imageUrl = `api/${each.image_url}`;
        var dateEl = new Date(each.created_time);
        $(".imagesContainer").append(
          `<div class = "imageCont bg-white shadow-lg rounded"><div class = "productImageCont"><img src = '${imageUrl}' class = "productImage w-100"/></div><div class = "descriptionCont d-flex justify-content-between p-2"><p class = "m-0 datePara">${dateEl.getDate()}-${dateEl.getMonth()}-${dateEl.getFullYear()}:${dateEl.getHours()}-${dateEl.getMinutes()}-${dateEl.getSeconds()}</p></div><p class = "m-0 titlePara pe-3 ps-3">${
            each.title
          }</p><p class = "m-0 descPara pe-3 ps-3">${
            each.description
          }</p></div>`
        );
      }
    }
  }).fail(function (jqXHR, status, error) {
    alert(error);
  });
  function getAllProducts() {
    $.get("./api/getPosts.php", function (response) {
      var response = JSON.parse(response);
      if (response.status) {
        for (let each of response.data) {
          var imageUrl = `api/${each.image_url}`;
          var dateEl = new Date(each.created_time);
          $(".imagesContainer").append(
            `<div class = "imageCont bg-white shadow-lg rounded"><div class = "productImageCont"><img src = '${imageUrl}' class = "productImage w-100"/></div><div class = "descriptionCont d-flex justify-content-between p-2"><p class = "m-0 datePara">${dateEl.getDate()}-${dateEl.getMonth()}-${dateEl.getFullYear()}:${dateEl.getHours()}-${dateEl.getMinutes()}-${dateEl.getSeconds()}</p></div><p class = "m-0 titlePara pe-3 ps-3">${
              each.title
            }</p><p class = "m-0 descPara pe-3 ps-3">${
              each.description
            }</p></div>`
          );
        }
      }
    }).fail(function (jqXHR, status, error) {
      alert(error);
    });
  }

  function getProductsByCategory(category) {
    console.log(category);
    $.post(
      "./api/getProductsByCategory.php",
      { category: category },
      function (response) {
        var response = JSON.parse(response);
        if (response.status) {
          for (let each of response.data) {
            var imageUrl = `api/${each.image_url}`;
            $(".imagesContainer").append(
              `<div class = "imageCont bg-white shadow-lg rounded"><img src = '${imageUrl}' class = "productImage w-100"/><div class = "descriptionCont d-flex justify-content-between"><p class = "m-0 datePara">${each.date_time}</p></div><p class = "m-0 titlePara">${each.title}</p><p class = "m-0 descPara">${each.description}</p></div>`
            );
          }
        }
      }
    ).fail(function (jqXHR, status, error) {
      alert(error);
    });
  }

  $("#allBtn").click(function () {
    $(".imagesContainer").empty();
    getAllProducts($(this).text());
  });
  $("#clothingBtn").click(function () {
    $(".imagesContainer").empty();
    getProductsByCategory($(this).text());
  });
  $("#electronicBtn").click(function () {
    $(".imagesContainer").empty();
    getProductsByCategory($(this).text());
  });
  $("#footwearBtn").click(function () {
    $(".imagesContainer").empty();
    getProductsByCategory($(this).text());
  });
});
