$(document).ready(function () {
  var token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login.html");
  }
  $("#addProductBtn").click(function (e) {
    e.preventDefault();
    var productName = $("#productName").val();
    var price = $("#price").val();
    var inventory = $("#inventory").val();
    var description = $("#description").val();
    var sellerId = $("#sellerId").val();
    var categoryId = $("#categoryId").val();

    if (isNaN(price)) {
      alert("Price must be Number");
      exit;
    }
    if (isNaN(inventory)) {
      alert("Inventory must be Number");
      exit;
    }
    if (isNaN(sellerId)) {
      alert("Seller Id must be Number");
      exit;
    }
    if (isNaN(categoryId)) {
      alert("Category Id must be Number");
      exit;
    }

    var check =
      productName &&
      !isNaN(price) &&
      !isNaN(inventory) &&
      description &&
      !isNaN(sellerId) &&
      !isNaN(categoryId);
    if (check) {
      $.post(
        "./api/addProducts.php",
        {
          product_name: productName,
          price: price,
          inventory: inventory,
          description: description,
          seller_id: sellerId,
          category_id: categoryId,
        },
        function (result) {
          result = JSON.parse(result);
          console.log(result);
          console.log(result.status);
          if (result.status) {
            alert(result.message);
            window.location.replace("./products.html");
          } else {
            alert(result.message);
          }
        }
      );
    } else {
      alert("All Inputs Must Be Filled");
    }
  });
});
